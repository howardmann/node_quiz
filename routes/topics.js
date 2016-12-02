var Topic = require('../models/topic');

exports.index = function(req, res, next) {
  Topic
    .fetchAll({withRelated: ['questions']})
    .then(data => {
      // res.render('topics/index', {data: data.toJSON()});
      res.json(data);
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

exports.new = (req, res, next) => {res.render('topics/new') };

exports.create = (req, res, next) => {
  Topic
    .forge({name: req.body.name})
    .save(null, {method: 'insert', require:true})
    .then(data => {
      // res.redirect('/topics');
      res.json(data);
    }, next)
};

exports.destroy = (req, res, next) => {
  Topic
    .forge({id: req.params.id})
    .fetch()
    .then( topic => {
      topic.destroy({require:true})
      .then(res.json('success'));
    }, next)
};

exports.edit = (req, res, next) => {
  Topic
    .where({id: req.params.id})
    .fetch()
    .then(data => {
      res.json(data);
      res.render('topics/edit', {data: data.toJSON()});
    }, next)
};

exports.update = (req, res, next) => {
  Topic
    .forge({id: req.params.id})
    .fetch()
    .then( data => {
      data.save({name: req.body.name})
      .then(res.json('success'));
    }, next);
};
