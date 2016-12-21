"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');

//Nba API modules
const nbaApi      = require('./nbaApi/nbaApi.js')
const nbaApiMongodb = require('./nbaApi/nbaApiMongodb')

//HTTP client
const axios = require('axios');
// const fetch = require('node-fetch')

//Seed teams
// require('./db/seeds/seed_teams.js')(knex)

//Seed players
// require('./db/seeds/seed_players.js')(knex)

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");
const teamsRoutes = require("./routes/teams");
const customTeamRoutes = require("./routes/custom_teams");

//Require CORS to enable cross-domain communication
const cors = require('cors')

//configures CORS option to allow only our REACT server to communicate
const corsOptions = {
  origin: 'https://g-lsh.github.io/client-side-basketball-app/',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};


//Connection to MongoDB
// const {MongoClient} = require("mongodb");
// const MONGODB_URI = "mongodb://localhost:27017/basketball"

// const db = MongoClient.connect(MONGODB_URI, (err, db) => {
//   if (err) {
//     console.error(`Failed to connect: ${MONGODB_URI}`);
//     throw err;
//   }

  app.use(cors())

  // Load the logger first so all (static) HTTP requests are logged to STDOUT
  // 'dev' = Concise output colored by response status for development use.
  //         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
  app.use(morgan('dev'));

  // Log knex SQL queries to STDOUT as well
  app.use(knexLogger(knex));

  // app.set("view engine", "ejs");

  app.use(bodyParser.urlencoded({ extended: true }));

  // app.use("/styles", sass({
  //   src: __dirname + "/styles",
  //   dest: __dirname + "/public/styles",
  //   debug: true,
  //   outputStyle: 'expanded'
  // }));
  // app.use(express.static("public"));

  // Mount all resource routes
  app.use("/users", usersRoutes(knex));
  app.use("/teams", teamsRoutes(knex));
  // app.use("/custom_teams", usersRoutes(knex));
  // app.use("/api", apiRoutes())

  // Test connection
  app.get("/", (req, res) => {
    res.status(200).send("Connection established!");
  });

  // nbaApi.getTeams(knex, console.log)
  // nbaApi.getTeamStats(knex, 1610612746, null)
  // nbaApi.getTeamBoxscore(knex, null)
  // nbaApi.getTeamPlayer(knex, null, null)
  // nbaApi.getAdvancedPlayerStats(knex, 2248, null)
  // nbaApi.getPlayerVuStats(knex, 1897, null)
  // nbaApi.getPlayerBoxscore(knex, null)
// }



app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});