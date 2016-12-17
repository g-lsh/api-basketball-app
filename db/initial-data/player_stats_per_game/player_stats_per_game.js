exports.seed = function(knex, Promise) {

  return Promise.all ([
    knex('player_stats_per_game').insert ({
      player_id: 1,
      team_id: 1,
      game_id: 1,
      FGA: 15,
      FGM: 10,
      FTA: 10,
      FTM: 5,
      TPT: 0,
      OREB: 5,
      DREB: 10,
      AST: 2,
      TOV: 3,
      STL: 1,
      BLK: 2,
      PF: 4,
      PTS: 25
    })
  ]);
};