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

  router.get("/:player_id/boxscores", (req, res) => {
    console.log("get request made for a players' boxscores")

    const player_id = req.params.player_id

    knex('player_stats_per_game')
      .where('player_id', player_id)
      .then((results) => {
      res.json(results)
    })
  })
  return router;
}