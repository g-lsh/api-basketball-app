"use strict";

const express = require('express')
const router  = express.Router()

module.exports = (knex) => {

  router.get("/:game_id/score", (req, res) => {
    const {game_id} = req.params;
    knex('games')
    .select('home_id', 'away_id', 'date')
    .where('id', game_id)
    .then((results) => {
      debugger;
      const homeId = results[0].home_id
      return knex('teams').select('id').where('api_id', homeId)
    })
    .catch((err) => {
      throw err
    })
  })


//Router for to obtain the players from a given team, given the team id
//note: could we use unique nba code to identify team instead?
  router.get("/:team_id/players", (req, res) => {
    console.log("get request made for a team's players")

    const team_id = req.params.team_id

    knex('players').where('team_id', team_id)
      .then((results) => {
      res.json(results)
    })
  })


  return router;
}
