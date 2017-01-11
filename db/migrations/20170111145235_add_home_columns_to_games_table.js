exports.up = function(knex, Promise) {
  return knex.schema.table('games', function(table){
    table.string('home_nba_code');
    table.integer('home_internal_id');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('games', function(table){
    table.dropColumn('home_nba_code');
    table.dropColumn('home_internal_id');
  })
};