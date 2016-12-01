var express = require('express');
var router = express.Router();
var questions = require('./questions.js');
var topics = require('./topics.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// TOPICS
router
  .get('/topics', topics.index)
  .get('/topics/:id', topics.show);

// QUESTIONS
router
  .get('/questions', questions.index)
  .get('/questions/:id', questions.show);

module.exports = router;
