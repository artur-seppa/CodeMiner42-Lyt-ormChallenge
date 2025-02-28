/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('clicks', function (table) {
        table.increments('id').primary();
        table.string('ip_address', 15).notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.integer('shorturl_id').unsigned().references('id').inTable('shortUrls').onDelete('CASCADE').notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('clicks');
};
