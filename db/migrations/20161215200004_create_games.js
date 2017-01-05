
exports.up = function(knex, Promise) {
  return knex.schema.createTable('games', function (table) {
    table.increments('id');
    table.integer('team_A_id');
    table.integer('team_B_id');
    table.integer('season');
    table.date('date');
    // table.foreign('team_A_id').references('teams.id');
    // table.foreign('team_B_id').references('teams.id');
  });
};
exports.down = function(knex, Promise) {
  return knex.schema.dropTable('games');
};
