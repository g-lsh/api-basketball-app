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

/*Seed Stats in sequential order, one at a time.*/

// 1) Seed teams
// require('./db/seeds/seed_teams.js')(knex);

// 2) Seed players
// require('./db/seeds/seed_players.js')(knex);

// 3) Seed players boxscores
// require('./db/seeds/seed_player_boxscores.js')(knex);

// 4) Seed games
// require('./db/seeds/seed_games.js')(knex)

// 5) Seed games home scoring
// require('./db/seeds/seed_games_home_scoring.js')(knex);

// 6) Seed games away scoring
// require('./db/seeds/seed_seed_games_away_scoring.js')(knex);

// 7) Seed home internal ids
// require('./db/seeds/seed_games_internal_home_ids.js')(knex);

// 8) Seed home nba code
// require('./db/seeds/seed_games_internal_home_nba_code.js')(knex);

// 9) Seed away nba code
// require('./db/seeds/seed_games_away_nba_code.js')(knex);

// 10) Seed away internal ids
// require('./db/seeds/seed_games_away_internal_ids.js')(knex);

/*Seed additional team info, tweeters must be first, other in no particular order.*/

// 1) Seed teams Twitter
// require('./db/seeds/seed_teams_twitter.js')(knex);

//Seed teams Website
// require('./db/seeds/seed_website.js')(knex)

//Seed teams Division
// require('./db/seeds/seed_division.js')(knex);

// Seed teams logos
// access route POST /scrape/logos via browser/postman etc...

//Seed teams background
// access route POST /scrape/background via browser/postman etc...

/*Seed additional player info from FantasyBasketball Nerd*/

//Seed add player info
// require('./db/seeds/seed_add_players_info.js')(knex);

//Seed player individual headshot
//acces route POST scrape/headshots.

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


// Mount all resource routes
app.use("/users", require("./routes/users")(knex));
app.use("/teams", require("./routes/teams")(knex));
app.use("/players", require("./routes/players")(knex));
app.use("/scrape", require("./routes/scrape")(knex));
app.use("/custom_teams", require("./routes/custom_teams")(knex));
app.use("/games", require("./routes/games")(knex));

// Test connection
app.get("/", (req, res) => {
  res.status(200).send("Connection established!");
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
