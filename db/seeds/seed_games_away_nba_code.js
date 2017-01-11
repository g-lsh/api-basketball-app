
module.exports = (knex) => {


  knex('games').select('away_id', 'teams.nba_code as away_nba_code', 'teams.id as away_internal_id')
  .innerJoin('teams', 'games.away_id', 'teams.api_id')
  .then((data) => {
    data.forEach((game) => {
      knex('games').update('away_nba_code', game.away_nba_code).where('away_id', game.away_id)
      .then((data) => console.log(data))
    })
  })
}