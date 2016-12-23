const headShot = "http://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/201942.png"

const insertHeadShot = (knex) => {
  knex("players")
    .update({head_shot:headShot})
    .then((args) => {
      console.log("HeadShot Inserted into teams")
    })
}

module.exports = insertHeadShot
