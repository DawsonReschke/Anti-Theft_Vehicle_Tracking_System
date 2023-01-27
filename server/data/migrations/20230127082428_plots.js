/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('plots',(t) => {
      t.increments('plot_id'); 
      
      t.integer('trip_id')
      .notNullable()
      .unsigned()
      .notNullable()
      .references('trip_id')
      .inTable('trips')
      .onDelete('CASCADE')

      t.timestamp('time').notNullable(); 
      t.decimal('latitude',9,6).notNullable();
      t.decimal('longitude',9,6).notNullable(); 
    })
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('plots')
  };
  