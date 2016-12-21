// //HTTP client
// const axios = require('axios')

// const apiKey = process.env.PRO_BASKETBALL_API
// const baseUrl = `http://api.probasketballapi.com`


// const getTeams = (callback, db) => {

//   axios({
//   method: 'post',
//   url: '/team',
//     params: {
//     api_key: apiKey,
//     },
//   baseURL: baseUrl
//   }).then((response) => {
//     callback(response.data, db)
//     console.log("data from getTeams:", response.data)
//   }).catch(function (error) {
//     console.log(error);
//   });
// }

// const getPlayers = (callback, db) => {

//   axios({
//   method: 'post',
//   url: '/player',
//     params: {
//     api_key: apiKey,
//     },
//   baseURL: baseUrl
//   }).then((response) => {
//     callback(response.data, db)
//     console.log("data from getPlayers:", response.data)
//   }).catch(function (error) {
//     console.log(error);
//   });
// }

// const getAdvancedPlayerStats = (db, player_id, callback) => {

//   axios({
//   method: 'post',
//   url: '/advanced/player',
//     params: {
//     api_key: apiKey,
//     player_id: player_id
//     },
//   baseURL: baseUrl
//   }).then((response) => {
//     callback(response.data)
//     console.log("data from getAdvancedPlayerStats:", response.data)
//   }).catch(function (error) {
//     console.log(error);
//   });
// }

// const getTeamStats = (db, team_id, callback) => {

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

// const getTeamBoxscore = (callback, db) => {

//   axios({
//   method: 'post',
//   url: `/boxscore/team`,
//     params: {
//     api_key: apiKey,
//     team_id: 1610612746,
//     opponent_id:1610612744
//     },
//   baseURL: baseUrl
//   }).then((response) => {
//     callback(response.data)
//     console.log("data from getTeamBoxscore:", response.data)
//   }).catch(function (error) {
//     console.log(error);
//   });
// }

// const getPlayerBoxscore = (callback, db, team_id) => {

//   axios({
//   method: 'post',
//   url: `/boxscore/player`,
//     params: {
//     api_key: apiKey,
//     team_id: team_id
//     },
//   baseURL: baseUrl
//   }).then((response) => {
//     callback(response.data, db)
//     console.log("data from getPlayerBoxscore:", response.data)
//   }).catch(function (error) {
//     console.log(error);
//   });
// }

// const getPlayerVuStats = (db, player_id, callback) => {

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

// // const getPlayerStats = (db, team_id, callback) => {

// //   axios({
// //   method: 'post',
// //   url: '/boxscore/player',
// //     params: {
// //     player_id:
// //     api_key: apiKey,
// //     team_id: team_id,
// //     season: "2012"
// //     },
// //   baseURL: baseUrl
// //   }).then((response) => {
// //     console.log("Processing request...")
// //     console.log("data from getPlayerStats:", response.data)
// //   }).catch(function (error) {
// //     console.log(error);
// //   });
// // }

// module.exports = {
//   getTeams: getTeams,
//   getPlayers: getPlayers,
//   getTeamStats: getTeamStats,
//   getTeamBoxscore: getTeamBoxscore,
//   getAdvancedPlayerStats: getAdvancedPlayerStats,
//   getPlayerVuStats: getPlayerVuStats,
//   getPlayerBoxscore: getPlayerBoxscore
// }


// // const getTeams = () => {
// //   fetch(`${baseUrl}&${apiKey}`, {
// //     method: 'POST',
// //       headers: {
// //         'Content-Type': 'application/json'
// //       },
// //   }).then((response) => {
// //     return response.json()
// //   }).then((json) => {
// //     console.log("data received", json)
// //   })
// // }
