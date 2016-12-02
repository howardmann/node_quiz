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
    ssl: true,
    connection: process.env.DATABASE_URL
  }

};
