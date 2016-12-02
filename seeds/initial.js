exports.seed = function(knex, Promise) {
  // Initial seed data
  var topics = [
    {name: 'geography'},
    {name: 'movies'},
    {name: 'celebrity'}
  ];

  var questions = [
    {question: 'What is the capital of Poland?', answer: 'Warsaw', topic_id: knex('topics').where({name: 'geography'}).select('id')},

    {question: "Canada's highest mountain is located in which province or territory", answer: 'Yukon', topic_id: knex('topics').where({name: 'geography'}).select('id')},

    {question: "What ocean trench is the deepest", answer: 'Marianas Trench', topic_id: knex('topics').where({name: 'geography'}).select('id')},

    {question: "The Giza Plateau can be found in what country", answer: 'Egypt', topic_id: knex('topics').where({name: 'geography'}).select('id')},

    {question: "What is the capital city of Croatia", answer: 'Zagreb', topic_id: knex('topics').where({name: 'geography'}).select('id')},

    {question: "Which city is located both in Asia and Europe?", answer: 'Istanbul', topic_id: knex('topics').where({name: 'geography'}).select('id')},

    {question: 'Who won the 2015 oscar for best actor', answer: 'James Bond', topic_id: knex('topics').where({name: 'movies'}).select('id')},

    {question: 'Which famous celebrity was burgled in Paris', answer: 'Kim Kardashain', topic_id: knex('topics').where({name: 'celebrity'}).select('id')}
  ];

  // Deletes ALL existing entries
  // return Promise.join(
  //   knex('questions').del(),
  //   knex('topics').del(),
  //
  //   knex('topics').insert(topics, 'id'),
  //   knex('questions').insert(questions, 'id')
  // );
  return knex('questions').del()
    .then(function(){
      return knex('topics').del()
    }).then(function(){
      return knex('topics').insert(topics, 'id')
    }).then(function(){
      return knex('questions').insert(questions, 'id');
    })

};
