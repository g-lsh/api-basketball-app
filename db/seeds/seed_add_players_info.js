const api = require('../../nbaApi/XMLapi.js');
/*This Api contains a few other mistakes othen than the
unhandled players: some birthdate are defined as '0000-00-00';
Some others have initial for first names, which don't match our db.
*/
const mapperFunction = (player) => {
  let name = player.name[0];
  let birthdate = player.dob[0];
  let unknown = 'unknown';
  if (birthdate === '0000-00-00') {
    player.dob[0] = '1900-01-01';
  }

  if (name.split(" ").length === 2) {
    let [first_name, last_name] = name.split(" ");
    return {
      first_name: first_name,
      last_name: last_name,
      height: player.height[0],
      weight: player.weight[0],
      college: player.school[0],
      birthdate: player.dob[0]
    }
  } else {
      return {
        first_name: unknown,
        last_name: name,
        height: unknown,
        weight: unknown,
        college: unknown,
        birthdate: unknown
      }
  }
}

const insertPlayersInfo = (knex, playersData) => {
  let collection = playersData.map(mapperFunction);
  let unhandledPlayers = []

  collection.forEach((player) => {
    if (player.first_name !== 'unknown') {
      knex('players')
      .where({
        first_name: player.first_name,
        last_name: player.last_name
      })
      .update({
        height: player.height,
        weight: player.weight,
        college: player.college,
        birthdate: player.birthdate
      })
      .then((data) => {
        console.log('Player info updated.');
      })
      .catch((err) => {
        console.log("Error occured when updating player info:", err);
      });
    } else {
        unhandledPlayers.push(player.last_name)
    }
  })
  console.log('unhandledPlayers', unhandledPlayers);
  return unhandledPlayers;
}

module.exports = function(knex) {

  api((playersData) => {
    let playersRecord = insertPlayersInfo(knex, playersData);
  })
}
