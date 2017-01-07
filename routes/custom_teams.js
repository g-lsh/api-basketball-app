"use strict";

const express = require('express');
const router  = express.Router();
const authenticate = require('../authenticate/authenticate.js');

module.exports = (knex) => {
/*To refractor: use authenticate once on all routes.*/


  /*Route to fetch custom team for a given user.*/
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

  /*Route to fetch players of a given custom team.*/
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

  /*Route to create new custom team for a given user.*/
  router.post("/new", authenticate, (req, res) => {
    if (!req.currentUser) {
      res.status(401).json({ error: 'Not logged in.'});
      return
    } else {
        const user = req.currentUser;
        const {name, players} = req.body;
        const newCustomTeam = {name, user_id: user.id}
        knex('custom_teams').select('id')
        .where(newCustomTeam)
        .then((arrayOfId) => {
          if (!arrayOfId.length) {
            knex('custom_teams')
            .insert(newCustomTeam, ['id', 'name'])
            .then((customTeamArray) => {
              const customTeam = customTeamArray[0];
              res.json(customTeam);
              const collection = JSON.parse(players).map((player_id) => {
                return {'player_id': player_id, 'custom_team_id': customTeam.id};
              })
              return knex('custom_team_id_to_player_id')
                .insert(collection)
            })
            .then((data) => {
              console.log('Players associated with custom team.');
            })
            .catch((err) => {
              res.status(500).json({ error: "Something went wrong when trying to add new custom team."});
            });
          } else {
              res.status(401).json({ error: "A custom team with this name already exists for this user."});
          }
        })
    }
  })

  /*Route to remove a player from a given custom team.*/
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
              custom_team_id: custom_team_id,
              player_id: player_id
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

   /*Route to add a player to a given custom team.*/
  router.put("/:custom_team_id/:player_id/add", authenticate, (req, res) => {
    if (!req.currentUser) {
      res.status(401).json({ error: 'Not logged in.'});
      return
    } else {
        const user = req.currentUser;
        const {custom_team_id, player_id} = req.params;
        const playerInsert = {custom_team_id, player_id}
        knex('custom_teams').select('id')
        .where('user_id', user.id)
        .then((data) => {
          if (data.length) {
            knex('custom_team_id_to_player_id').select('player_id')
            .where(playerInsert)
            .then((data) => {
              if(data.length) {
                res.status(401).send(`Player with id ${player_id} already belongs to this custom team.`);
                return
              } else {
                  knex('custom_team_id_to_player_id')
                  .insert(playerInsert)
                  .then((data) => {
                    res.status(201).json({ success: `Player with id: ${player_id} added to custom team.`})
                  })
                  .catch((err) => {
                    res.status(500).json({ error: "Something went wrong when trying to add player to custom team."});
                  });
              }
            })
          } else {
              res.status(401).json({ error: "The current user is not the owner of this team."});
          }
        })
        .catch((err) => {
          res.status(500).json({ error: "Something went wrong when trying to add player to custom team."});
        });
    }
  })

  /*Route to remove a custom team.*/
  router.put("/:custom_team_id/remove", authenticate, (req, res) => {
    if (!req.currentUser) {
      res.status(401).json({ error: 'Not logged in.'});
      return
    } else {
        const user = req.currentUser;
        const {custom_team_id} = req.params;
        knex('custom_teams').select('id')
        .where({
          user_id: user.id,
          id: custom_team_id
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

  /*Route to update a given custom team's name.*/
  router.put("/:custom_team_id/update", authenticate, (req, res) => {
    if (!req.currentUser) {
      res.status(401).json({ error: 'Not logged in.'});
      return
    } else {
        const user = req.currentUser;
        const {custom_team_id} = req.params;
        const newName = req.body.name;
        debugger;
        knex('custom_teams').select('id')
        .where({
          user_id: user.id,
          id: custom_team_id
        })
        .update('name', newName)
        .then((data) => {
          debugger;
          if (data) {
            res.status(201).send(`Custom team name changed to ${newName}`);
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
