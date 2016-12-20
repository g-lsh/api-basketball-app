
exports.up = function(knex, Promise) {
  return knex.schema.createTable('teams', function (table) {
    table.increments('id');
    table.string('name')
    table.string('nba_code')
    table.string('location')
    table.string('logo')
    table.string('background')
    table.boolean('division')
    table.string('website')
  });
};

exports.down = function(knex, Promise) {
return knex.schema.dropTable('teams');
};