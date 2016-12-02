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
  .get('/topics/new', topics.new)
  .post('/topics', topics.create)
  .get('/topics/:id', topics.show)
  .get('/topics/:id/edit', topics.edit)
  .put('/topics/:id', topics.update)
  .delete('/topics/:id', topics.destroy);

// QUESTIONS
router
  .get('/questions', questions.index)
  .get('/questions/:id', questions.show)
  .post('/questions', questions.create)
  .put('/questions/:id', questions.update)
  .delete('/questions/:id', questions.destroy);

module.exports = router;
