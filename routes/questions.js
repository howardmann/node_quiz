var Question = require('../models/question');
var Topic = require('../models/topic');
var _ = require('underscore');

exports.index = function(req, res, next) {
  Question
    .fetchAll({withRelated: ['topic']})
    .then(data => {
      var questions = data.toJSON();
      var topics = _.uniq(questions.map(el => el.topic.name));

      var dataSort = topics.map(function(el){
        return {topic: el, questions: questions.filter(question => question.topic.name === el )};
      });
      console.log(dataSort);
      res.render('questions/index', {
        data: dataSort
      })
    }, next)
};

exports.show = function(req, res, next) {
  Question
    .where({id: req.params.id})
    .fetch({withRelated: ['topic']})
    .then(data => {
      res.json(data);
    }, next)
};

exports.new = (req, res, next) => {
  Topic
    .fetchAll()
    .then(data => {
      console.log(data.toJSON());
      res.render('questions/new', {
        topics: data.toJSON()
      });
    }, next)

};

exports.create = (req, res, next) => {
  Question
    .forge({question: req.body.question, answer: req.body.answer, topic_id: req.body.topic_id})
    .save(null, {method: 'insert', require:true})
    .then(data => {
      res.redirect('/#');
      // res.json(data);
    }, next)
};

exports.destroy = (req, res, next) => {
  Question
    .forge({id: req.params.id})
    .fetch()
    .then( topic => {
      topic.destroy({require:true})
      .then(res.redirect('/#'));
    }, next)
};

exports.update = (req, res, next) => {
  Question
    .forge({id: req.params.id})
    .fetch()
    .then(data => {
      data.save({question: req.body.question, answer: req.body.answer, topic_id: req.body.topic_id},{method: 'update', patch: true})
      .then(res.json(data));
    }, next)
};
