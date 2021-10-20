var express = require('express');
var router = express.Router();
const controller = require('../controllers/controller');

router.get(
  '/',
  (req, res, next) => res.status(200).json('hello world')
  // res.render('index', { title: 'Express' });
);

// POST one person
router.post('/people', controller.postOnePerson, (req, res) => 
  res.status(200).json(res.locals.rows)
);

// GET one person
router.get('/people/:id', controller.getOnePerson, (req, res) => 
  res.status(200).json(res.locals.rows)
);

// GET all people
router.get('/people', controller.getAllPeople, (req, res) =>
  res.status(200).json(res.locals.rows)
);

// PUT one person
router.put('/people', controller.putOnePerson, (req, res) => 
  res.status(200).json(res.locals.rows)
);

// DELETE one person
router.delete('/people/:id', controller.deleteOnePerson, (req, res) =>
  res.status(200).json(res.locals.rows)
);

// DELETE all people
router.delete('/people', controller.deleteAllPeople, (req, res) => 
  res.status(200).json(res.locals.rows)
);

module.exports = router;
