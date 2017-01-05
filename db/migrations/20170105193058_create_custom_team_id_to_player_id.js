exports.up = function(knex, Promise) {
  return knex.schema.createTable('custom_team_id_to_player_id', function (table) {
    table.integer('player_id');
    table.integer('custom_team_id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('custom_team_id_to_player_id');
};
