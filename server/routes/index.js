var express = require('express');
var router = express.Router();
const controller = require('../controllers/controller');

// POST person
router.post('/people', controller.postPerson, (req, res) => 
  res.status(200).json(res.locals.rows)
);

// GET person
router.get('/people/:id', controller.getPerson, (req, res) => 
  res.status(200).json(res.locals.rows)
);

// GET people
router.get('/people', controller.getPeople, (req, res) =>
  res.status(200).json(res.locals.rows)
);

// PUT person
router.put('/people', controller.putPerson, (req, res) => 
  res.status(200).json(res.locals.rows)
);

// DELETE person
router.delete('/people/:id', controller.deletePerson, (req, res) =>
  res.status(200).json(res.locals.rows)
);

// DELETE people
router.delete('/people', controller.deleteAllPeople, (req, res) => 
  res.status(200).json(res.locals.rows)
);

router.get(
  '/',
  (req, res, next) => res.status(200).json('hello world')
  // res.render('index', { title: 'Express' });
);

module.exports = router;
