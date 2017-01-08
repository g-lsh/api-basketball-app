exports.up = function(knex, Promise) {
  return knex.schema.table('games', function(table){
    table.integer('away_score');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('games', function(table){
    table.dropColumn('away_score');
  })
};