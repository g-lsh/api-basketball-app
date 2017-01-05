
exports.up = function(knex, Promise) {
  return knex.schema.createTable('custom_teams', function (table) {
    table.increments('id');
    table.integer('user_id');
    table.string('name');
    // table.foreign('user_id').references('users.id')
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('custom_teams');
};
