'use strict'

const users = require("../initial-data/users/users.js")
const games = require("../initial-data/games/games.js")
const players = require("../initial-data/players/players.js")
const player_stats_per_game = require("../initial-data/player_stats_per_game/player_stats_per_game.js")
const teams = require("../initial-data/teams/teams.js")
const custom_teams = require("../initial-data/custom_teams/custom_teams.js")

const waterfall = require("async/waterfall")

exports.seed = function(knex, Promise) {
  waterfall([
  (callback) => {
    console.log("step1")
    users.seed(knex, Promise, callback)
  },
  (users, callback) => {
    console.log("step 2")
    games.seed(knex, Promise, users, callback)
  }], (err, result) => {
    console.log("Done", err)
  })
}


// exports.seed = function(knex, Promise) {
//   return users.seed(knex, Promise)
//   .then(() => {
//     return teams.seed(knex, Promise)
//   }).then(() => {
//     return custom_teams.seed(knex, Promise)
//   }).then(() => {
//     console.log("custom_teams")
//     return players.seed(knex, Promise)
//   }).then (() => {
//     console.log("players")
//     return games.seed(knex, Promise)
//   }).then (() => {
//     console.log("games")
//     player_stats_per_game(knex, Promise)
//   })
// }