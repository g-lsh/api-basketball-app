exports.up = function(knex, Promise) {
  return knex.schema.table('games', function(table){
    table.string('away_nba_code');
    table.integer('away_internal_id');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('games', function(table){
    table.dropColumn('away_nba_code');
    table.dropColumn('away_internal_id');
  })
};