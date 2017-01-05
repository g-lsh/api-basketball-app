"use strict";

const express = require('express');
const router  = express.Router();
const authenticate = require('../authenticate/authenticate.js');


module.exports = (knex) => {

  // router.get("/user/players", (req, res) => {

  //   const team_id = req.params.team_id

  //   knex('players').where('team_id', team_id)
  //     .then((results) => {
  //     res.json(results)
  //   })
  // })

  router.post("/new", authenticate, (req, res) => {
    if (!req.currentUser) {
      res.status(401).json({ error: 'No token found.'});
      return
    } else {
        const user = req.currentUser;
        const {name, players} = req.body;
        knex('custom_teams')
          .insert({
          name: name,
          user_id: user.id
        }, 'id')
      .then((arrayOfId) => {
        const custom_team_id = arrayOfId[0];
        const collection = JSON.parse(players).map((player_id) => {
          return {'player_id': player_id, 'custom_team_id': custom_team_id }
        })
        return knex('custom_team_id_to_player_id')
        .insert(collection)
      }).then((data) => {
        console.log('Players associated with custom team.');
      });
    }
  })

  return router;
}
