const { Pool } = require('pg');

const pool = new Pool({
  connectionString:
    'postgres://eogcopiq:EhhVSDBZVcE9xWjnixeC_0auXxbq9q4g@fanny.db.elephantsql.com/eogcopiq'
});

const controller = {};

// POST one person
controller.postOnePerson = async (req, res, next) => {
  try {
    // req.body is an object of 1 key value pair
    const { first_name, last_name } = req.body;
    const values = [first_name, last_name];

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

    // res.locals.rows is []
    const { rows } = await pool.query(myQuery, values);
    res.locals.rows = rows;
    next();
  } catch (error) {
    console.log('my error', error);
    next(error);
  }
};

// GET one person
controller.getOnePerson = async (req, res, next) => {
  try {
    // req.params.id is a number
    const id = req.params.id;
    const myQuery = `SELECT * FROM people WHERE id = ${id};`;

    // res.locals.rows is [{"id":1, "first_name": "sheila", "last_name": "wang"}]
    const { rows } = await pool.query(myQuery);
    res.locals.rows = rows;
    next();
  } catch (error) {
    console.log('my error', error);
    next(error);
  }
};

// GET all people
controller.getAllPeople = async (req, res, next) => {
  try {
    // there is nothing on req
    const myQuery = `SELECT * FROM people;`;

    // res.locals.rows is [{"id":1, "first_name": "sheila", "last_name": "wang"}]
    const { rows } = await pool.query(myQuery);
    res.locals.rows = rows;
    next();
  } catch (error) {
    console.log('my error', error);
    next(error);
  }
};

// PUT one person
controller.putOnePerson = async (req, res, next) => {
  try {
    // req.body is an object of key value pairs
    const { id, first_name, last_name } = req.body;

    const myQuery = `
      UPDATE people 
      SET first_name = '${first_name}', last_name = '${last_name}'
      WHERE id = ${id};
      `;

    // res.locals.rows is []
    const { rows } = await pool.query(myQuery);
    res.locals.rows = rows;
    next();
  } catch (error) {
    console.log('my error', error);
    next(error);
  }
};

// DELETE one person
controller.deleteOnePerson = async (req, res, next) => {
  try {
    // req.params.id is a number
    const id = req.params.id;
    const myQuery = `DELETE FROM people WHERE id = ${id};`;

    // res.locals.rows is []
    const { rows } = await pool.query(myQuery);
    res.locals.rows = rows;
    next();
  } catch (error) {
    console.log('my error', error);
    next(error);
  }
};

// DELETE all people
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

    // res.locals.rows is []
    const myQuery = `DELETE FROM people WHERE id IN (${myString});`;
    const { rows } = await pool.query(myQuery);
    res.locals.rows = rows;
    next();
  } catch (error) {
    console.log('my error', error);
    next(error);
  }
};

module.exports = controller;
