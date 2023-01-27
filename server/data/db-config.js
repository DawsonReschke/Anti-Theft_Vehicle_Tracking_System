require('dotenv').config({path:'../.env'})
const knex = require('knex');
const env = process.env.NODE_ENV;
const knexConfig = require('../config/knexfile')[env || 'development']
const db = knex(knexConfig);

module.exports = db; 