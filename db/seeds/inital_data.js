'use strict'

// const users = require("../initial-data/users/users.js")
// const games = require("../initial-data/games/games.js")
// const players = require("../initial-data/players/players.js")
// const player_stats_per_game = require("../initial-data/player_stats_per_game/player_stats_per_game.js")
// const teams = require("../initial-data/teams/teams.js")
// const custom_teams = require("../initial-data/custom_teams/custom_teams.js")

// const waterfall = require("async/waterfall")

// exports.seed = function(knex, Promise) {
//   waterfall([
//   (callback) => {
//     console.log("step1")
//     users.seed(knex, Promise).then((users) => {
//       console.log("users", users)
//     })
//   },
//   (users, callback) => {
//     console.log("step 2")
//     games.seed(knex, Promise, users, callback)
//   }], (err, result) => {
//     console.log("Done", err)
//   })
// }

// const users = []


// exports.seed = function(knex, Promise) {
//   return users.seed(knex, Promise)
//   .then((users) => {
//     return teams.seed(knex, Promise, users)
//   }).then((users, teams) => {
//     return custom_teams.seed(knex, Promise, users, teams)
//   }).then((users, teams, custom_teams) => {
//     console.log("custom_teams")
//     return players.seed(knex, Promise, users, teams, custom_teams)
//   }).then ((users, teams, custom_teams, players) => {
//     console.log("players")
//     return games.seed(knex, Promise, users, teams, custom_teams, players)
//   }).then ((users, teams, custom_teams, players, games) => {
//     console.log("games")
//     player_stats_per_game.seed(knex, Promise, users, teams, custom_teams, players, games)
//   })
// }


const api = require('../../nbaApi/nbaApi.js')

const mapperFunction = (teamJSON) => {
  return {
    api_id: teamJSON.id,
    location: teamJSON.city,
    nba_code: teamJSON.abbreviation
  }
}

const insertTeams = (knex, teamsJSON) => {
  let collection = teamsJSON.map(mapperFunction)

  console.log(collection)
  return knex
  .insert(collection, '*')
  .into("teams")
}

module.exports = function(knex) {

  api.getTeams(null, (teamsJSON) => {
    let teamsRecord = insertTeams(knex, teamsJSON)
    console.log(teamsRecord)
  })
}
