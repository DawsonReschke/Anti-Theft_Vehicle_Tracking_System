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
  
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('plots')
};
  