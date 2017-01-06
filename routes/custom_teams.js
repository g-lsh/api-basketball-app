"use strict";

const express = require('express');
const router  = express.Router();
const authenticate = require('../authenticate/authenticate.js');

module.exports = (knex) => {
/*To refractor: use authenticate once on all routes.*/
  router.get("/", authenticate, (req, res) => {
    if (!req.currentUser) {
      res.status(401).json({ error: 'Not logged in.'});
      return
    } else {
        const user = req.currentUser;
        knex('custom_teams').where('user_id', user.id)
          .then((results) => {
          res.json(results);
        })
      }
  })

  router.get("/:custom_team_id/players", authenticate, (req, res) => {
    if (!req.currentUser) {
      res.status(401).json({ error: 'Not logged in.'});
      return
    } else {
      const {custom_team_id} = req.params;
      knex('custom_team_id_to_player_id')
      .select('player_id')
      .where('custom_team_id', custom_team_id)
      .then((results) => {
        res.json(results);
      }).catch((err) => {
        res.status(500).json({error: `something went wrong when fetching custom team ${custom_team_id} players`});
      })
    }
  })

  router.post("/new", authenticate, (req, res) => {
    if (!req.currentUser) {
      res.status(401).json({ error: 'Not logged in.'});
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
          return {'player_id': player_id, 'custom_team_id': custom_team_id};
        })
        return knex('custom_team_id_to_player_id')
        .insert(collection)
      }).then((data) => {
        console.log('Players associated with custom team.');
      });
    }
  })

  router.put("/:custom_team_id/:player_id/remove", authenticate, (req, res) => {
    if (!req.currentUser) {
      res.status(401).json({ error: 'Not logged in.'});
      return
    } else {
        const user = req.currentUser;
        const {custom_team_id, player_id} = req.params;
        knex('custom_teams').select('id')
        .where('user_id', user.id)
        .then((data) => {
          if (data.length) {
            knex('custom_team_id_to_player_id').where({
              'custom_team_id': custom_team_id,
              'player_id': player_id
              })
            .del()
            .then((data) => {
              if(data) {
                res.status(201).send("player deleted from custom team.");
              } else {
                  res.status(401).json({ error: "Player not in specified custom team."});
              }
            })
          } else {
              res.status(401).json({ error: "The current user is not the owner of this team."});
          }
        })
        .catch((err) => {
          res.status(500).json({ error: "Something went wrong when trying to remove player from custom team."});
        });
    }
  })

  router.put("/:custom_team_id/remove", authenticate, (req, res) => {
    if (!req.currentUser) {
      res.status(401).json({ error: 'Not logged in.'});
      return
    } else {
        const user = req.currentUser;
        const {custom_team_id} = req.params;
        knex('custom_teams').select('id')
          .where({
            'user_id': user.id,
            'id': custom_team_id
          })
          .del()
          .then((data) => {
            if (data) {
              res.status(201).send("Custom team deleted from custom teams.");
            } else {
              res.status(401).json({ error: "The current user does not owned the specified custom team or the custom does not exist."});
            }
          })
          .catch((err) => {
            res.status(500).json({ error: "Something went wrong when trying to remove the custom team."});
          });
    }
  })

  return router;
}
