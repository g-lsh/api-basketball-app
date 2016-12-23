const website = "http://www.nba.com/raptors/"

const insertWebsite = (knex) => {
  knex("teams")
    .update({website:website})
    .then((args) => {
      console.log("Website Inserted into teams")
    })
}

module.exports = insertWebsite
