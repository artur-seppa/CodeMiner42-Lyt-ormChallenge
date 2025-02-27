/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('shortUrls', function (table) {
        table.increments('id').primary();
        table.string('original_url').notNullable();
        table.string('short_url').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now()); 
        table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE').notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('shortUrls');
};
