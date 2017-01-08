'use strict'

const api = require('../../nbaApi/nbaApi.js')

const mapperFunction = (teamJSON) => {
  return {
    api_id: teamJSON.id,
    location: teamJSON.city,
    nba_code: teamJSON.abbreviation,
    name: teamJSON.team_name
  }
}

const insertTeams = (knex, teamsJSON) => {
  let collection = teamsJSON.map(mapperFunction);

  knex
  .insert(collection, '*')
  .into("teams")
  .then(function(args) {
    console.log("Teams inserted into database");
  }).catch(function(err) {
    console.log(err);
  })
}

module.exports = function(knex) {

  api.getTeams((teamsJSON) => {
    let teamsRecord = insertTeams(knex, teamsJSON);
  })
}
