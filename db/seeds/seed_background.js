const background = "https://images.trvl-media.com/hotels/15000000/14770000/14762000/14761971/14761971_1_z.jpg"

const insertBackground = (knex) => {
  knex("teams")
    .update({background:background})
    .then((args) => {
      console.log("Background Inserted into teams")
    })
}

module.exports = insertBackground
