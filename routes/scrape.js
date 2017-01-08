//Logic to scrape player's headshots
"Use strict";
const express = require('express');
const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');
const router  = express.Router();


const insertHeadshot = (knex, player) => {
  knex("players")
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
  return router;
}