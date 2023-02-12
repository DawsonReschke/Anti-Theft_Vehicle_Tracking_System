exports.up = function(knex) {
    return knex.schema.createTable('trips',(t) => {
      t.increments('trip_id'); // trips will increment so we can find the most recent trip.
      t.string('device_id').notNullable(); //each trip will be associated with a given device.
      t.timestamp('start_time').notNullable(); // a new trip will be created when we have the initial plot so we can reference its time as the start time.
      t.timestamp('end_time').notNullable();  // each time a new plot is added during the same trip, the trips end time will be updated to the new plots time. 
    })
  };
  
exports.down = function(knex) {
  return knex.schema.raw("DROP TABLE trips CASCADE");
};
  