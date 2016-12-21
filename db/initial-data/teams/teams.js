
// const nbaApi = require('./nbaApi/nbaApi.js')

exports.seed = function(knex, Promise, users_ids) {

  return Promise.all ([
    knex('teams').insert ({
      name: "Raptors",
      nba_code: "TOR",
      location: "Toronto",
      logo: "http://content.sportslogos.net/logos/6/227/full/1183_toronto_raptors-alternate-2016.png",
      background:"http://presetpro.com/wp-content/uploads/2015/09/Toronto-Skyline-Sample.png",
      division: true,
      website: "http://www.nba.com/raptors/?tmd=1"
    }),
    knex('teams').insert ({
      name: "Spurs",
      nba_code: "SAN",
      location: "San Antonio",
      logo: "http://i.cdn.turner.com/nba/nba/.element/img/1.0/teamsites/logos/teamlogos_500x500/sas.png",
      background:"https://upload.wikimedia.org/wikipedia/commons/7/76/Aerial_view_of_San_Antonio._Texas,_and_the_surrounding_plains,_12-1939_-_NARA_-_512843.jpg",
      division: false,
      website: "http://www.nba.com/spurs/"
    })
  ]);
};
