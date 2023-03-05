/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('devices',(t) => {
        t.increments('device_id'); 
        t.string('user_id')
            .notNullable()
            .unique();
        t.string('device_secret',12)
            .notNullable()
            .unique()
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.raw('DROP TABLE devices CASCADE')
};
