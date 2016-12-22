const api = require('../../nbaApi/nbaApi.js')

const mapperFunction = (team_id, playersJSON) => {
  let collection = playersJSON.map((playerJSON) => {
  return {
    api_id: playerJSON.id,
    team_id: team_id,
    first_name: playerJSON.first_name,
    last_name: playerJSON.last_name,
    birthdate: playerJSON.birthdate,
    position: playerJSON.position
  }
})
  return collection
}

const insertPlayers = (knex, playersJSON) => {

  knex('teams')
    .select('id')
    .where('api_id', playersJSON[0].team_id)
    .then((idArray) => {
      let team_id = idArray[0].id
      const collection = mapperFunction(team_id, playersJSON)
      debugger
      // execute and return the knex query
      return knex('players')
        .insert(collection)
      }).then((data) => {
        debugger
        console.log('Players inserted into database')
      });
    }


module.exports = function(knex) {

let team_id = 1610612761
//Could implement forEach hear with all team ids and call for each, but could also
//attempt to fetch all players and loop through them above.
  api.getTeamPlayers(team_id, (playersJSON) => {
    let playersRecord = insertPlayers(knex, playersJSON)
  })
}