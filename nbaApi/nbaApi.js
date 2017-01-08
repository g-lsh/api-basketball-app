//HTTP client
const axios = require('axios');
// const = require('async')
const apiKey = process.env.PRO_BASKETBALL_API;
const baseUrl = `http://api.probasketballapi.com`;


const getTeams = (callback) => {
  return axios({
    method: 'post',
    url: '/team',
      params: {
      api_key: apiKey,
      },
    baseURL: baseUrl
    }).then((response) => {
      callback(response.data);
    }).catch(function (error) {
      console.log(error);
  });
}

const getGames = (season, callback) => {
  return axios({
    method: 'post',
    url: '/game',
      params: {
      api_key: apiKey,
      season: season
      },
    baseURL: baseUrl
    }).then((response) => {
      callback(response.data);
    }).catch(function (error) {
      console.log(error);
  });
}

const getTeamPlayers = (team_id, callback) => {
  return axios({
    method: 'post',
    url: '/player',
      params: {
      api_key: apiKey,
      team_id: team_id
      },
    baseURL: baseUrl
    }).then((response) => {
      callback(response.data);
    }).catch(function (error) {
      console.log(error);
  });
}

const getPlayerBoxscore = (team_id, player_id, season, callback) => {
  return  axios({
    method: 'post',
    url: `/boxscore/player`,
      params: {
      api_key: apiKey,
      team_id: team_id,
      player_id: player_id,
      season: season
      },
    baseURL: baseUrl
    })
    .then((response) => {
      callback(response.data);
    });
}


const getTeamBoxscore = (team_id, season, callback) => {
  return axios({
    method: 'post',
    url: `/boxscore/team`,
      params: {
      api_key: apiKey,
      opponent_id: team_id,
      season: 2016
      },
    baseURL: baseUrl
    }).then((response) => {
      callback(response.data)
    }).catch(function (error) {
      console.log(error);
    });
}

// const getAdvancedPlayerStats = (knex, player_id, callback) => {

//   axios({
//   method: 'post',
//   url: '/advanced/player',
//     params: {
//     api_key: apiKey,
//     player_id: player_id
//     },
//   baseURL: baseUrl
//   }).then((response) => {
//     // callback(response.data)
//     console.log("data from getAdvancedPlayerStats:", response.data)
//   }).catch(function (error) {
//     console.log(error);
//   });
// }

// const getTeamStats = (knex, team_id, callback) => {

//   axios({
//   method: 'post',
//   url: '/advanced/team',
//     params: {
//     api_key: apiKey,
//     team_id: team_id,
//     season: "2012"
//     },
//   baseURL: baseUrl
//   }).then((response) => {
//     console.log("Processing request...")
//     console.log("these are the stats:", response.data)
//   }).catch(function (error) {
//     console.log(error);
//   });
// }




// const getPlayerVuStats = (knex, player_id, callback) => {

//   axios({
//   method: 'post',
//   url: '/sportsvu/player',
//     params: {
//     api_key: apiKey,
//     player_id: player_id
//     },
//   baseURL: baseUrl
//   }).then((response) => {
//     // callback(response.data)
//     console.log("data from getPlayers:", response.data)
//   }).catch(function (error) {
//     console.log(error);
//   });
// }

// const getPlayerStats = (knex, team_id, callback) => {

//   axios({
//   method: 'post',
//   url: '/boxscore/player',
//     params: {
//     player_id:
//     api_key: apiKey,
//     team_id: team_id,
//     season: "2012"
//     },
//   baseURL: baseUrl
//   }).then((response) => {
//     console.log("Processing request...")
//     console.log("data from getPlayerStats:", response.data)
//   }).catch(function (error) {
//     console.log(error);
//   });
// }

module.exports = {
  getTeams: getTeams,
  getTeamPlayers: getTeamPlayers,
  getPlayerBoxscore: getPlayerBoxscore,
  getGames: getGames,
  getTeamBoxscore: getTeamBoxscore
}


// const getTeams = () => {
//   fetch(`${baseUrl}&${apiKey}`, {
//     method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//   }).then((response) => {
//     return response.json()
//   }).then((json) => {
//     console.log("data received", json)
//   })
// }
