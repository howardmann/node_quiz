var Topic = require('../models/topic');

exports.index = function(req, res, next) {
  Topic
    .fetchAll({withRelated: ['questions']})
    .then(data => {
      res.render('topics/index', data.toJSON());
    }, next)
};

exports.show = function(req, res, next) {
  Topic
    .where({id: req.params.id})
    .fetch({withRelated: ['questions']})
    .then(data => {
      res.json(data);
    }, next)
};
