require('dotenv').config('../.env')

let connection = process.env.PG_CONNECTION_STRING || {
  host:'127.0.0.1',
  port:'49155',
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
