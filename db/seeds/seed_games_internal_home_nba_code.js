
module.exports = (knex) => {


  knex('games').select('home_id', 'away_id', 'teams.nba_code as home_nba_code', 'teams.id as home_internal_id')
  .innerJoin('teams', 'games.home_id', 'teams.api_id')
  .then((data) => {
    data.forEach((game) => {
      knex('games').update('home_nba_code', game.home_nba_code).where('home_id', game.home_id)
      .then((data) => console.log(data))
    })
  })
}