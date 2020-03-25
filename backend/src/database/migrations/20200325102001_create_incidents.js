
exports.up = function (knex) {
    return knex.schema
        .createTable('INCIDENTS', function (table) {
            table.string('id').primary().notNullable();
            table.string('title').notNullable();
            table.string('description').notNullable();
            table.decimal('value').notNullable();
            table.string('ong_id').notNullable();
            table.foreign('ong_id').references('id').inTable('ONGS').notNullable();
        });
};

exports.down = function (knex) {
   return knex.schema.dropTable('INCIDENTS')
};