//Logic to scrape player's headshots
"Use strict";
const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const router  = express.Router();


const insertHeadshot = (knex, player) => {
  knex('players')
  .where({
    first_name: player.first_name,
    last_name: player.last_name
  })
  .update({
    head_shot: player.headshot
  })
  .then((args) => {
    console.log("Headshot inserted into teams")
  })
  .catch((err) => {
    console.log("error occured:", err)
  })
}

const insertTeamLogo = (knex, team) => {
  knex('teams')
  .where({
    id: team.id
  })
  .update({
    logo: team.logo
  })
  .then((args) => {
    console.log("Logo inserted into teams")
  })
  .catch((err) => {
    console.log("error occured when trying to insert logos:", err)
  })
}

const insertTeamBackground = (knex, team) => {
  knex('teams')
  .where({
    id: team.id
  })
  .update({
    background: team.background
  })
  .then((args) => {
    console.log("Background inserted into teams")
  })
  .catch((err) => {
    console.log("error occured when trying to insert backgrounds:", err)
  })
}


module.exports = (knex) => {

  router.get('/headshots', (req, res) => {

    url = 'http://www.nba.com/players';

    request(url, (error, response, html) => {
      if(!error) {

        let $ = cheerio.load(html);
        let unhandled_players = [];

        $('.row.nba-player-index__row').children().each(function(i, element) {

          let data = $(this)

          let first_name, last_name;
          let headshot = 'http:';
          let player = { first_name: "", last_name: "", headshot: ""};

          //Each player section is structurally identical. Check whether we can
          //use better code here to get name and image
          let name = data.children()[1].attribs.title;
          headshot += data.children().children('.nba-player-index__image').children().children().attr('data-src');
          if (name.split(" ").length === 2) {
            let [first_name, last_name] = name.split(" ");
            player.headshot = headshot;
            player.first_name = first_name;
            player.last_name = last_name;
          } else {
            unhandled_players.push(name);
          }
          insertHeadshot(knex, player);
        })
      return unhandled_players;
      }

    })
  })

  router.get('/logos', (req, res) => {

    const fetchLogo = (url, teamId) => {
      request(url, (error, response, html) => {
        if(!error) {

          let $ = cheerio.load(html);

          $('.ProfileAvatar-image').filter(function() {
            let data = $(this);
            let logo = data.attr('src');

            let team = {logo, id: teamId};
            insertTeamLogo(knex, team);
          })
        }
      })
    }

    knex('teams').select('twitter', 'id')
    .then((teamsArray) => {
      teamsArray.forEach((team) => {
        fetchLogo(team.twitter, team.id);
      })
    })
  })

  router.get('/backgrounds', (req, res) => {
    const fetchBackground = (url, teamId) => {
      request(url, (error, response, html) => {
        if(!error) {
          let $ = cheerio.load(html);
          $('.ProfileCanopy-headerBg').filter(function() {
            let data = $(this);
            let background = data.children('img').attr('src');
            let team = {background, id: teamId};
            insertTeamBackground(knex, team);
          })
        }
      })
    }

    knex('teams').select('twitter', 'id')
    .then((teamsArray) => {
      teamsArray.forEach((team) => {
        fetchBackground(team.twitter, team.id)
      })
    })
  })


  return router;
}