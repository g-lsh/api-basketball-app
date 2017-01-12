exports.up = function(knex, Promise) {
  return knex.schema.table('player_stats_per_game', function(table){
    table.string('MIN');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('player_stats_per_game', function(table){
    table.dropColumn('MIN');
  })
};