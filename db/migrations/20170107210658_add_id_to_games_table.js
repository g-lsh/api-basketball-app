exports.up = function(knex, Promise) {
  return knex.schema.table('games', function(table){
    table.integer('id');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('games', function(table){
    table.dropColumn('id');
  })
};