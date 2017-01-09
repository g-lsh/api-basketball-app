const api = require('../../nbaApi/XMLapi.js');
/*This code could be used to update team's conference as well as divsions.*/
const mapperFunction = (team) => {
  return {
    code: team.code,
    division: team.division,
    conference: team.conference
  }
}

const insertTeamsInfo = (knex, teamsData) => {
  let collection = teamsData.map(mapperFunction);
  let unhandledTeams = []

  collection.forEach((team) => {
    knex('teams')
    .where('nba_code', team.code)
    .update({
      division: team.division,
      conference: team.conference
    })
    .then((data) => {
      console.log('Player info updated.');
    })
    .catch((err) => {
      console.log("Error occured when updating player info:", err);
    });
  })
  console.log('unhandledPlayers', unhandledPlayers);
  return unhandledPlayers;
}

module.exports = function(knex) {

  api.fetchTeamsInfo((TeamsData) => {
    let teamsRecord = insertPlayersInfo(knex, teamsData);
  })
}
