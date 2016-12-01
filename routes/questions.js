var Question = require('../models/question');

exports.index = function(req, res, next) {
  Question
    .fetchAll({withRelated: ['topic']})
    .then(data => {
      res.json(data);
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
