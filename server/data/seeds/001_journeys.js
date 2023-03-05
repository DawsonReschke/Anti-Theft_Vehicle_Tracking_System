const { journeys } = require('./journeys.json')

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('journeys').del()
  await knex('journeys').insert(journeys);
};
