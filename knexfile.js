// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      user: 'howardmann',
      database: 'node_quiz'
    }
  },

  production: {
    client: 'pg',
    connection: {
      host: 'ec2-54-163-254-48.compute-1.amazonaws.com',
      user: 'fdmaefajoouwpq',
      password: 'stTfCZ3neUD9Pr9gtC01LgLX93',
      database: 'damc31c8bhoc65'
    }
  }

};
