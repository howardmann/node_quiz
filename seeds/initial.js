exports.seed = function(knex, Promise) {
  // Initial seed data
  var topics = [
    {name: 'geography'},
    {name: 'movies'},
    {name: 'celebrity'}
  ];

  var questions = [
    {question: 'What is the capital of Poland?', answer: 'Warsaw', topic_id: knex('topics').where({name: 'geography'}).select('id')},
    {question: 'Who won the 2015 oscar for best actor', answer: 'James Bond', topic_id: knex('topics').where({name: 'movies'}).select('id')},
    {question: 'Which famouse celebrity was burgled in Paris', answer: 'Kim Kardashain', topic_id: knex('topics').where({name: 'celebrity'}).select('id')}
  ];

  // Deletes ALL existing entries
  return Promise.join(
    knex('questions').del(),
    knex('topics').del(),

    knex('topics').insert(topics, 'id'),
    knex('questions').insert(questions, 'id')
  )
};
