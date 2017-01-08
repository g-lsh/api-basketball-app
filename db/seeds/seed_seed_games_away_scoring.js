const api = require('../../nbaApi/nbaApi.js')

const insertGameHomeScoring = (knex, gamesJSON) => {
  debugger;
  gamesJSON.forEach((game) => {
    knex('games')
      .where({
        id: game.game_id,
        away_id: game.team_id
      })
      .update({
        away_score: game.pts,
      })
      .then((data) => {
        console.log('Home scoring inserted into database.')
      })
      .catch((data) => {
        throw err;
      })
    })
  }

module.exports = function(knex) {
/*Before running, check that getTeamBoxscore is set for opponent_id*/
  const fetchGamesHomeScoring = (teamIdsArray) => {
    teamIdsArray.forEach((teamIdObject) => {
      api.getTeamBoxscore(teamIdObject.api_id, 2016, (gamesJSON) => {
        let playersRecord = insertGameHomeScoring(knex, gamesJSON)
      })
    })
  }

  knex('teams')
    .select('api_id')
    .then((teamIdsArray) => {
      fetchGamesHomeScoring(teamIdsArray)
    })
  }