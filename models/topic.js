var Bookshelf = require('../config/db');
require('./question');

var Topic = Bookshelf.Model.extend({
  tableName: 'topics',

  questions: function(){
    return this.hasMany('Question');
  }

}, {
  dependents: ['questions']
});

module.exports = Bookshelf.model('Topic', Topic);
