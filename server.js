"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 3000;
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
const api = require('./nbaApi/nbaApi.js');

//HTTP client
const axios = require('axios');
// const fetch = require('node-fetch');

//Require CORS to enable cross-domain communication
const cors = require('cors');

//configures CORS option to allow only our REACT server to communicate
const corsOptions = {
  origin: 'https://g-lsh.github.io/client-side-basketball-app/',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

//Seed teams
// require('./db/seeds/seed_teams.js')(knex);

// //Seed players
// require('./db/seeds/seed_players.js')(knex);

//Seed players boxscores
// require('./db/seeds/seed_player_boxscores.js')(knex);

//Seed teams logos
// require('./db/seeds/seed_logos.js')(knex);

//Seed teams background
// require('./db/seeds/seed_background.js')(knex);

//Seed teams Division
// require('./db/seeds/seed_division.js')(knex);

//Seed teams Website
// require('./db/seeds/seed_website.js')(knex)

// Seed players headShot
// require('./db/seeds/seed_head_shot.js')(knex)

// Seed games
// require('./db/seeds/seed_games.js')(knex)

// Seed games home scoring
// require('./db/seeds/seed_games_home_scoring.js')(knex);

// Seed games away scoring
// require('./db/seeds/seed_seed_games_away_scoring.js')(knex);

//Seed teams Twitter
// require('./db/seeds/seed_teams_twitter.js')(knex);

//Seed add player info
// require('./db/seeds/seed_add_players_info.js')(knex);

//Seed empty boxscores
require('./db/seeds/seed_players_empty_boxscores.js')(knex);


app.use(cors());

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

// app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use("/styles", sass({
//   src: __dirname + "/styles",
//   dest: __dirname + "/public/styles",
//   debug: true,
//   outputStyle: 'expanded'
// }));
// app.use(express.static("public"));

// Mount all resource routes
app.use("/users", require("./routes/users")(knex));
app.use("/teams", require("./routes/teams")(knex));
app.use("/players", require("./routes/players")(knex));
app.use("/scrape", require("./routes/scrape")(knex));
app.use("/custom_teams", require("./routes/custom_teams")(knex));
app.use("/games", require("./routes/games")(knex));
// app.use("/api", apiRoutes())

// Test connection
app.get("/", (req, res) => {
  res.status(200).send("Connection established!");
});

// require('./db/seeds/test.js')(knex)
// require('./nbaApi/XMLapi.js')(console.log);
// require('./nbaApi/XMLapi.js').fetchTeamsInfo(console.log);
// api.getTeams(knex, console.log)
// api.getTeamStats(knex, 1610612746, null)
// api.getTeamBoxscore(1610612761, 2016, console.log)
// api.getTeamPlayers(1610612764, console.log)
// api.getAdvancedPlayerStats(knex, 2248, null)
// api.getPlayerVuStats(knex, 1897, null)
// api.getPlayerBoxscore(1610612764, null, 2016, console.log)
// }

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
