/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('waypoints',(t) => {
      t.increments('waypoint_id'); 
      
      t.integer('journey_id')
      .notNullable()
      .unsigned()
      .references('journey_id')
      .inTable('journeys')
      .onDelete('CASCADE')

      t.dateTime('time').notNullable(); 
      t.decimal('lat',9,6).notNullable();
      t.decimal('lon',9,6).notNullable(); 
    })
  };

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.raw('DROP TABLE waypoints CASCADE');
};
