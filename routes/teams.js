"use strict";

const express = require('express')
const router  = express.Router()

module.exports = (knex) => {

  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("teams")
      .then((results) => {
        res.json(results);
    }).catch((err) => {
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
