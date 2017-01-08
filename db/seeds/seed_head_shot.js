
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
    debugger;
    console.log("Headshot inserted into teams");
  })
  .catch((err) => {
    debugger;
    console.log("error occured:", err);
  })
}

module.exports = insertHeadshot;
