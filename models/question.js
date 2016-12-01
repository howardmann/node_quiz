var Bookshelf = require('../config/db');
require('./topic');

var Question = Bookshelf.Model.extend({
  tableName: 'questions',

  topic: function(){
    return this.belongsTo('Topic');
  }

});

module.exports = Bookshelf.model('Question', Question);
