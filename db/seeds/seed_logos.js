const logo = "http://i.cdn.turner.com/nba/nba/.element/img/1.0/teamsites/logos/teamlogos_500x500/tor.png"

const insertLogo = (knex) => {
  knex("teams")
    .update({logo:logo})
    .then((args) => {
      console.log("Logo Inserted into teams")
    })
}

module.exports = insertLogo
