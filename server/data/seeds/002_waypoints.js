const { waypoints } = require('./waypoints.json')
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('waypoints').del()
  await knex('waypoints').insert(waypoints);
};
