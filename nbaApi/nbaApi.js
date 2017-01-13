const axios = require('axios');
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


module.exports = {
  getTeams: getTeams,
  getTeamPlayers: getTeamPlayers,
  getPlayerBoxscore: getPlayerBoxscore,
  getGames: getGames,
  getTeamBoxscore: getTeamBoxscore
}