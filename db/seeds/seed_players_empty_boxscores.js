
module.exports = (knex) => {
//   knex('games').select('id')
//   .then((gameIdsArray) => {
//     let playersGamesArray = [] ;
//     gameIdsArray.forEach((game) => {
//        knex('players').select('id')
//         .then((playerIdsArray) => {
//           playerIdsArray.forEach((player) => {
//           const playerGame = {playerId: player.id, gameId: game.id};
//           playersGamesArray.push(playerGame)
//           console.log(playersGamesArray)
//         })

//         // playerIdsArray.forEach((player) => {

//         //   return knex('player_stats_per_game')
//         //   .whereNot({
//         //     'player_id': player.id,
//         //     'game_id': game.id
//         //   })
//         //   .then((data) => {
//         //     debugger;
//         //   })
//         //   .catch((err) => {
//         //     console.log(err);
//         //   })
//         })
//     })
//     debugger;
//   })
// }

  // knex('teams').select('id', 'api_id')
  // .then((teamIdsArray) => {
  //   teamIdsArray.forEach((team) => {
  //     return knex('games').select('id')
  //     .where('home_id', team.api_id)
  //     .orWhere('away_id', team.api_id)
  //     .then((gameIdsArray) => {
  //       gameIdsArray.forEach((game) => {
  //         knex('player_stats_per_game').select('')
  //       })
  //     })
  //   })
  // })


  // knex.select('*').from('teams').join('games', function() {
  //   this.on(function() {
  //     this.on('games.home_id', '=', 'teams.id')
  //     this.orOn('games.away_id', '=', 'teams.id')
  //   })
  // }).then((data) => {console.log(data)})

// knex('teams').select('teams.id as team_id', 'games.id as game_id', 'player_stats_per_game.player_id as player_id')
// .innerJoin('games', function() {
//   this.on('games.home_id', '=', 'teams.api_id').orOn('games.away_id', '=', 'teams.api_id')
// }).leftJoin('player_stats_per_game', 'player_stats_per_game.game_id','games.id').then((data) => console.log(data.filter((el) => el.team_id === 4 && el.player_id === 104)))

// knex('users').innerJoin('accounts', function() {
//   this.on('accounts.id', '=', 'users.account_id').orOn('accounts.owner_id', '=', 'users.id')
// })

knex('players').select('players.id as player_id', 'player_stats_per_game.game_id as game_id', 'games.home_id as home_id', 'teams.id as team_id', 'games.away_id as away_id' )
.leftJoin('player_stats_per_game', 'player_stats_per_game.player_id', 'players.id')
.leftJoin('games', 'games.id', 'player_stats_per_game.game_id')
.leftJoin('teams', function() {
  this.on('teams.api_id', '=', 'games.home_id').orOn('teams.api_id', '=', 'games.away_id')
})
.then((data) => console.log(data))


// knex.select('*').from('users').join('accounts', function() {
//   this.on(function() {
//     this.on('accounts.id', '=', 'users.account_id')
//     this.orOn('accounts.owner_id', '=', 'users.id')
//   })
// })


//   knex('teams')
//   .join('games', 'teams.api_id', '=', 'games.home_id' )
//   .select('teams.id as team_id', 'games.id as game_id')
//   .then((gamesArray) => {
//     gamesArray.forEach((game) => {
//       knex('players').select('id').where('team_id', game.team_id).then((playerIdsArray) => {
//         playerIdsArray.forEach((player) => {
//           return knex('player_stats_per_game').select('*').where({player_id: player.id, game_id: game.game_id}).then((data) => {
//             if(!data.length) {
//               console.log(player.id, game.team_id, game.game_id)
//             }
//           })
//       })
      // console.log("here comes the game:", game.game_id)
      // knex('players').select('*')
      // .leftOuterJoin('player_stats_per_game', 'players.id', 'player_stats_per_game.player_id')
      // .where({
      //   // team_id: game.team_id,
      //   game_id: game.game_id
      // })
      // .then((data) => {
      //   console.log(data)
  //     })
  //   })
  // })
}