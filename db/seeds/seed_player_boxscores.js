'use strict'

const api = require('../../nbaApi/nbaApi.js')

const mapperFunction = (playerBoxscoreJSON) => {
  return {
    //player_id, team_id and game_id will have to be dynamically converted from api eventually
    player_id: 4,
    team_id: 25,
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
}

const insertPlayerBoxscores = (knex, playerBoxscoresJSON) => {
  let collection = playerBoxscoresJSON.map(mapperFunction)

  knex
  .insert(collection, '*')
  .into("player_stats_per_game")
  .then(function(args) {
    console.log("Player Boxscores inserted into database")
  }).catch(function(err) {
    console.log(err)
  })
}

module.exports = function(knex) {

let player_id = 200768
  api.getPlayerBoxscore(player_id, (playerBoxscoresJSON) => {
    let playerBoxscoresRecord = insertPlayerBoxscores(knex, playerBoxscoresJSON)
  })
}
