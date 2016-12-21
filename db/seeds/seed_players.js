const api = require('../../nbaApi/nbaApi.js')

const mapperFunction = (playerJSON) => {
  return {
    api_id: playerJSON.id,
    team_id: 25,
    first_name: playerJSON.first_name,
    last_name: playerJSON.last_name,
    birthdate: playerJSON.birthdate,
    position: playerJSON.position
  }
}

const insertPlayers = (knex, playersJSON) => {
  let collection = playersJSON.map(mapperFunction)

  knex
  .insert(collection)
  .into("players")
  .then(function(args) {
    console.log("Players inserted into database")
  }).catch(function(err) {
    console.log(err)
  })
}


module.exports = function(knex) {

  //team id harcoded, to be fetched from api eventually
  api.getTeamPlayers(1610612761, (playersJSON) => {
    let playersRecord = insertPlayers(knex, playersJSON)
  })
}