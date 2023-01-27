// Update with your config settings.
require('dotenv').config('../.env')
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

let connection = process.env.PG_CONNECTION_STRING || {
  host:'127.0.0.1',
  port:'49153',
  user:'postgres',
  password:'postgrespw',
}

module.exports = {

  development: {
    client: 'pg',
    connection: connection,
    migrations:{
      directory:'../data/migrations'
    },
    seeds:{
      directory:'../data/seeds'
    }
  },

  production: {
    client: 'pg',
    connection: process.env.PG_CONNECTION_STRING
  }

};
