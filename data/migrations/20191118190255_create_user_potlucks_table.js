
exports.up = function(knex) {
  return knex.schema.createTable('user_potlucks', tbl => {
    tbl.increments();
    tbl.integer('user_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    tbl.integer('potluck_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('potlucks')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    tbl.boolean('accepted')
      .notNullable()
      .defaultTo(false)
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('user_potlucks');
};
