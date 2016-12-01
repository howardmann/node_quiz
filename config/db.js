var config = require("../knexfile")[process.env.NODE_ENV || "development"];
var knex = require("knex")(config);
// Require bookshelf
var Bookshelf = require('bookshelf')(knex);
var cascadeDelete = require('bookshelf-cascade-delete');
Bookshelf.plugin('registry');
Bookshelf.plugin(cascadeDelete);

module.exports = Bookshelf;
