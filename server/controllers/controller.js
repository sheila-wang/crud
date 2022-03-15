const pool = require('../models/model');

const controller = {};

// POST person
controller.postPerson = async (req, res, next) => {
  try {
    // req.body is an object of 1 key value pair
    const { first_name, last_name } = req.body;
    console.log('request body', req);

    // inserts record with auto generated primary key
    const myQuery = `
      INSERT INTO people (
        first_name,
        last_name
      ) VALUES (
        $1,
        $2
      );
    `;

    // res.locals.rows is [] from sql database
    // const { rows } = await pool.query(myQuery, [first_name, last_name]);
    await pool.query(myQuery, [first_name, last_name]);
    // res.locals.rows = rows;
    res.locals.rows = req.body;
    next();

  } catch (error) {
    console.log('my error', error);
    next(error);
  }
};

// GET person
controller.getPerson = async (req, res, next) => {
  try {
    // req.params.id is a number
    const id = req.params.id;
    const myQuery = `SELECT * FROM people WHERE id = $1;`;

    // res.locals.rows is [{"id":1, "first_name": "sheila", "last_name": "wang"}]
    const { rows } = await pool.query(myQuery, [id]);
    res.locals.rows = rows;
    next();

  } catch (error) {
    console.log('my error', error);
    next(error);
  }
};

// GET people
controller.getPeople = async (req, res, next) => {
  try {
    // there is nothing on req
    const myQuery = `SELECT * FROM people;`;

    /* 
    res.locals.rows is 
    [{"id":1, "first_name": "sheila", "last_name": "wang"},
    {"id":2, "first_name": "jeremy", "last_name": "rempel"}]
    */
    const { rows } = await pool.query(myQuery);
    res.locals.rows = rows;
    next();

  } catch (error) {
    console.log('my error', error);
    next(error);
  }
};

// PUT person
controller.putPerson = async (req, res, next) => {
  try {
    // req.body is an object of key value pairs
    const { id, first_name, last_name } = req.body;

    const myQuery = `
      UPDATE people 
      SET first_name = '${first_name}', last_name = '${last_name}'
      WHERE id = $1;
      `;

    // res.locals.rows is []
    const { rows } = await pool.query(myQuery, [id]);
    res.locals.rows = rows;
    next();

  } catch (error) {
    console.log('my error', error);
    next(error);
  }
};

// DELETE person
controller.deletePerson = async (req, res, next) => {
  try {
    // req.params.id is a string, must coerce to number
    const id = Number(req.params.id);
    const myQuery = `DELETE FROM people WHERE id = $1;`;

    // res.locals.rows is []
    const { rows } = await pool.query(myQuery, [id]);
    res.locals.rows = rows;
    next();

  } catch (error) {
    console.log('my error', error);
    next(error);
  }
};

// DELETE people, has bugs
controller.deleteAllPeople = async (req, res, next) => {
  try {
    // req.body is an array of ids
    const arrayOfId = req.body;

    console.log('arrayOfId', arrayOfId);
    // res.locals.rows is []
    const myQuery = `DELETE FROM people WHERE id IN ($1:list);`;
    const { rows } = await pool.query(myQuery, [arrayOfId]);
    res.locals.rows = rows;
    next();

  } catch (error) {
    console.log('my error', error);
    next(error);
  }
};

/*
// DELETE all people, not sanitized
controller.deleteAllPeople = async (req, res, next) => {
  try {
    // req.body is an array of ids
    const arrayOfId = req.body;

    let myString = '';

    for (let index = 0; index < arrayOfId.length; index++) {
      myString += String(arrayOfId[index]);

      if (index !== arrayOfId.length - 1) {
        myString += ', ';
      }
    }

    console.log('arrayOfId', arrayOfId);
    // res.locals.rows is []
    const myQuery = `DELETE FROM people WHERE id IN (myString);`;
    const { rows } = await pool.query(myQuery);
    res.locals.rows = rows;
    next();
  } catch (error) {
    console.log('my error', error);
    next(error);
  }
};
*/

module.exports = controller;