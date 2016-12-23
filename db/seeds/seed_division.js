
const insertDivision = (knex) => {
  knex("teams")
    .where('id', '<', 16)
    .update({division:false})
    .then((args) => {
      console.log("Division Inserted into teams")
    })

    knex("teams")
      .where('id', '>', 15)
      .update({division:true})
      .then((args) => {
        console.log("Division Inserted into teams")
      })
}

module.exports = insertDivision
