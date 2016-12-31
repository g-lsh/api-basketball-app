'use strict'

const api = require('../../nbaApi/nbaApi.js')

const mapperFunction = (player_id, team_id, playerBoxscoresJSON) => {
  let collection = playerBoxscoresJSON.map((playerBoxscoreJSON) => {
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
  return collection
}

const insertPlayerBoxscores = (knex, playerBoxscoresJSON) => {

  let player_api_id = playerBoxscoresJSON[0].player_id

  knex('players')
    .select('id', 'team_id')
    .where('api_id', player_api_id)
    .then((playerIdArray) => {
      let player_id = playerIdArray[0].id
      let team_id = playerIdArray[0].team_id
      let collection = mapperFunction(player_id, team_id, playerBoxscoresJSON)
        return knex('player_stats_per_game')
          .insert(collection)
          .then((data) => {
            console.log("Player stats inserted into the database")
            return null;
          }).catch((err) => {
            console.log("This is the error:", err)
        })
})
} 

module.exports = function(knex) {

  const fetchPlayerBoxscores = (playersApiIdsArray, times = 4) => {

    if (times === 0) {return playersApiIdsArray}

    let errors = []

    let firedCalls = playersApiIdsArray.map((playerApiIdObject) => {
      let player_api_id = playerApiIdObject.api_id

      return api.getPlayerBoxscore(null, player_api_id, 2016, (playerBoxscoresJSON) => {
        if (playerBoxscoresJSON.length !== 0) {
          let playerBoxscoresRecord = insertPlayerBoxscores(knex, playerBoxscoresJSON)
        } else {
          console.log("Empty array")
        }
      }).catch((resp) => {
          errors.push(playerApiIdObject)
        })
    })

    Promise.all(firedCalls).then(() => {
      if (errors.length > 0) {
        return fetchPlayerBoxscores(errors, times - 1)
      } else { console.log("No more errors")}
    })
  }

  knex('players')
    .select('api_id')
    .then((playersApiIdsArray) => {
      let result = fetchPlayerBoxscores(playersApiIdsArray)
      console.log(result)
      return result
    })

  }
