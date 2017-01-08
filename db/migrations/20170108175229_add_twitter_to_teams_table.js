exports.up = function(knex, Promise) {
  return knex.schema.table('teams', function(table){
    table.string('twitter');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('teams', function(table){
    table.dropColumn('twitter');
  })
};