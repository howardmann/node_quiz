
exports.up = function(knex, Promise) {
  return knex.schema.createTable('questions', function(table){
    table.increments();
    table.string('question').notNullable();
    table.string('answer').notNullable();
    table.integer('topic_id').references('topics.id');
    table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
    table.timestamp('updated_at').notNullable().defaultTo(knex.raw('now()'));
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("questions");
};
