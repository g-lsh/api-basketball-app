'use strict'

const api = require('../../nbaApi/nbaApi.js')

const mapperFunction = (playerObject, playerBoxscoresJSON) => {
  let player_id = playerObject.id
  let team_id = playerObject.team_id
  let playersBoxscores = playerBoxscoresJSON.map((playerBoxscoreJSON) => {
    return {
      player_id: player_id,
      team_id: team_id,
      game_id: playerBoxscoreJSON.game_id,
      season: playerBoxscoreJSON.season,
      FGA: playerBoxscoreJSON.fga,
      FGM: playerBoxscoreJSON.fgm,
      FTA: playerBoxscoreJSON.fta,
      FTM: playerBoxscoreJSON.ftm,
      FG3M: playerBoxscoreJSON.fg3m,
      FG3A: playerBoxscoreJSON.fg3a,
      OREB: playerBoxscoreJSON.oreb,
      DREB: playerBoxscoreJSON.dreb,
      AST: playerBoxscoreJSON.ast,
      TOV: playerBoxscoreJSON.to,
      STL: playerBoxscoreJSON.stl,
      BLK: playerBoxscoreJSON.blk,
      PF: playerBoxscoreJSON.pf,
      PTS: playerBoxscoreJSON.pts
    }
  })
  return playersBoxscores
}


const insertPlayerBoxscores = (knex, playerBoxscoresJSON) => {

  let team_api_id = playerBoxscoresJSON[0].team_id

  knex('teams')
    .select('id')
    .where('api_id', team_api_id)
    .then((teamIdArray) => {
      let team_id = teamIdArray[0].id
      return knex('players')
        .select('id', 'team_id')
        .where('team_id', team_id)
    }).then((playersObjectArray) => {

        playersObjectArray.forEach((playerObject) => {
          let collection = mapperFunction(playerObject, playerBoxscoresJSON)

          return knex('player_stats_per_game')
            .insert(collection)
            .then((data) => {
              console.log(`Player stats per game inserted into the database for ${playerObject}`)
              return null;
            })
            .catch((err) => {
            })
          })
      })
  }

module.exports = function(knex) {

  const fetchPlayerBoxscores = (teamApiIdsArray) => {
    teamApiIdsArray.forEach((teamApiIdObject) => {
      let team_api_id = teamApiIdObject.api_id
      api.getPlayerBoxscore(team_api_id, null, 2016, (playerBoxscoresJSON) => {
        let playerBoxscoresRecord = insertPlayerBoxscores(knex, playerBoxscoresJSON)
      })
    })
  }

  knex('teams')
    .select('api_id')
    .then((teamApiIdsArray) => {
      fetchPlayerBoxscores(teamApiIdsArray)
    })
  }
