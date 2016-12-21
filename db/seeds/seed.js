"use strict";
require('dotenv').config({path: '../../.env'});

//Nba API modules
const nbaApiMongodb = require('../../nbaApi/nbaApiMongodb')

//Connection to MongoDB
const {MongoClient} = require("mongodb");
const MONGODB_URI = "mongodb://localhost:27017/basketball"

const db = MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }

  const seedTeams = (teams, db) => {
    db.collection("teams").insert(teams)
  }

  const seedPLayers = (players, db) => {
    db.collection("players").insert(players)
  }

  // const seedPLayersBoxscore = (playersBoxscore, db) => {
  //   db.collection("playerboxscores").insert(playersBoxscore)
  // }
  // nbaApiMongodb.getPlayerBoxscore(seedPLayersBoxscore, db, 1610612746)
  // nbaApiMongodb.getTeams(seedTeams, db)
  // nbaApiMongodb.getPlayers(seedPLayers, db)
})
