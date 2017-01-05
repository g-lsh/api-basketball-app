exports.up = function(knex, Promise) {
  return knex.schema.table('players', function(table){
    table.dropColumn('custom_team_id');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('players', function(table){
    table.integer('custom_team_id');
  })
};