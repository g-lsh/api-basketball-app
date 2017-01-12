"use strict";

const express = require('express')
const router  = express.Router()

module.exports = (knex) => {

  router.get("/:player_id", (req, res) => {

    const player_id = req.params.player_id

    knex('players')
    .select("*")
    .where("id", player_id)
    .then((results) => {
      res.json(results);
    })
    .catch((err) => {
      res.satus(500).json({'error': 'Something went wrong when retrieving player info'})
    })
  })

//Route for to obtain all boxscore for a give player

  router.get("/:player_id/boxscores", (req, res) => {
    console.log("get request made for a players' boxscores")

    const player_id = req.params.player_id

    let playerStats = knex('player_stats_per_game')
      .where('player_id', player_id)
      .innerJoin('games', 'games.id', 'player_stats_per_game.game_id')
      .innerJoin('teams', 'player_stats_per_game.team_id', 'teams.id')


    let playerGames = knex('players').select('players.id as player_id',
      'teams.api_id as team_api_id',
      'teams.id as team_id',
      'games.id as team_game_id',
      'games.date as date',
      'games.home_id as home_id',
      'games.away_id as away_id',
      'games.home_score as home_score',
      'games.away_score as away_score',
      'games.away_internal_id as away_internal_id',
      'games.away_nba_code as away_nba_code',
      'games.home_nba_code as home_nba_code',
      'games.home_internal_id as home_internal_id'
      )
    .innerJoin('teams', 'teams.id', 'players.team_id')
    .innerJoin('games', function() {
      this.on('games.home_id', '=', 'teams.api_id').orOn('games.away_id', '=', 'teams.api_id')
    })
    .where('players.id', player_id)
    .as('player_games')

    const playedGames = knex('player_stats_per_game')
    .where('player_id', player_id)
    .select('game_id')

    let unplayedGames = knex.select('*').from(playerGames).whereNotIn('player_games.team_game_id', playedGames)

    let allGames = Promise.all([playerStats, unplayedGames]).then(values => {
      res.json(values[0].concat(values[1]).filter(el => el.home_score !== null))
    })
  })

  return router;
}