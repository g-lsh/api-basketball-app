exports.up = function(knex, Promise) {
  return knex.schema.table('games', function(table){
    table.dropColumn('id');
    table.dropColumn('team_A_id');
    table.dropColumn('team_B_id');
    table.integer('home_id');
    table.integer('away_id');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('games', function(table){
    table.increment('id');
    table.integer('team_A_id');
    table.integer('team_B_id');
    table.dropColumn('home_id');
    table.dropColumn('away_id');
  })
};