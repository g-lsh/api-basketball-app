
exports.up = function(knex, Promise) {
  return knex.schema.createTable('player_stats_per_game', function (table) {
    table.increments('id');
    table.integer('player_id');
    table.integer('team_id');
    table.integer('game_id');
    table.integer('season');
    // table.foreign('player_id').references('players.id');
    // table.foreign('team_id').references('teams.id');
    // table.foreign('game_id').references('games.id');
    table.integer('FGA');
    table.integer('FGM');
    table.integer('FTA');
    table.integer('FTM');
    table.integer('FG3M');
    table.integer('FG3A');
    table.integer('OREB');
    table.integer('DREB');
    table.integer('AST');
    table.integer('TOV');
    table.integer('STL');
    table.integer('BLK');
    table.integer('PF');
    table.integer('PTS');
  });
};
exports.down = function(knex, Promise) {
  return knex.schema.dropTable('player_stats_per_game');
};
