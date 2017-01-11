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
    }).catch((err) => {
      throw err
    })
  })


//Route for to obtain all boxscore for a give player

  // router.get("/:player_id/boxscores", (req, res) => {
  //   console.log("get request made for a players' boxscores")

  //   const player_id = req.params.player_id

  //   knex('player_stats_per_game')
  //     .where('player_id', player_id)
  //     .then((results) => {
  //     res.json(results)
  //   })
  // })


  router.get("/:player_id/boxscores", (req, res) => {
    console.log("get request made for a players' boxscores")

    const player_id = req.params.player_id

    knex('player_stats_per_game')
      .where('player_id', player_id)
      .innerJoin('games', 'games.id', 'player_stats_per_game.game_id')
      // .innerJoin('teams', function() {
      //   this.on('games.home_id', '=', 'teams.api_id').orOn('games.away_id', '=', 'teams.api_id')
      // })
      .innerJoin('teams', 'games.home_id', 'teams.api_id')
      .innerJoin('teams', 'games.away_id', 'teams.api_id')
      .orderBy('date')
      .then((results) => {
      res.json(results)
    })
  })

  return router;
}