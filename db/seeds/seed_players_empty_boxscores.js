
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
// .leftJoin('games', function() {
//   this.on('games.home_id', '=', 'teams.api_id').orOn('games.away_id', '=', 'teams.api_id')
// }).leftJoin('player_stats_per_game', 'player_stats_per_game.game_id','games.id').then((data) => console.log(data.filter((el) => el.team_id === 4 && el.player_id === 104)))

// knex('users').innerJoin('accounts', function() {
//   this.on('accounts.id', '=', 'users.account_id').orOn('accounts.owner_id', '=', 'users.id')
// })

// knex('players').select('players.id as player_id', 'player_stats_per_game.game_id as player_game_id', 'games.home_id as home_id', 'teams.id as team_id', 'games.away_id as away_id', 'games.id as team_game_id')
// .leftJoin('player_stats_per_game', 'player_stats_per_game.player_id', 'players.id')
// .leftJoin('games', 'games.id', 'player_stats_per_game.game_id')
// .leftJoin('teams', function() {
//   this.on('teams.api_id', '=', 'games.home_id').orOn('teams.api_id', '=', 'games.away_id')
// })
// .then((data) => console.log(data.filter((el) => el.player_game_id === null)))


// knex('players').select('players.id as player_id', 'teams.id as team_id', 'games.id as game_id', 'player_stats_per_game.game_id as player_game_id')
// .leftJoin('player_stats_per_game', 'players.id', 'player_stats_per_game.player_id')
// .join('teams', 'players.team_id', 'teams.id')
// .leftJoin('games', 'teams.api_id', 'games.home_id')
// .then((data) => console.log(data.filter((el) => el.game_id !== el.player_game_id  && el.team_id === 4 && el.player_id === 96 && el.player_game_id === 21600185).length))

// knex('players').select('players.id as player_id', 'teams.id as team_id', 'games.id as game_id', 'player_stats_per_game.game_id as player_game_id')
// .leftJoin('player_stats_per_game', 'players.id', 'player_stats_per_game.player_id')
// .join('teams', 'players.team_id', 'teams.id')
// .leftJoin('games', function() {
//   this.on('games.home_id', '=', 'teams.api_id').orOn('games.away_id', '=', 'teams.api_id')
// })
// .then((data) => console.log(data.filter((el) => el.game_id === el.player_game_id  && el.team_id === 4 && el.player_id === 96 && el.player_game_id === 21600060)))


//The query below returns all the games in which a given player (filter applied) is supposed to play for the entire season.



let playerGames = knex('players').select('players.id as player_id', 'teams.api_id as team_api_id', 'teams.id as team_id', 'games.id as team_game_id', 'games.date as date')
.innerJoin('teams', 'teams.id', 'players.team_id')
.innerJoin('games', function() {
  this.on('games.home_id', '=', 'teams.api_id').orOn('games.away_id', '=', 'teams.api_id')
})
.where('players.id', '96')
.as('player_games')

const playedGames = knex('player_stats_per_game')
.where('player_id', '96')
.select('game_id')
// .then((data) => console.log(data))

knex.select('*').from(playerGames).whereNotIn('player_games.team_game_id', playedGames)
.then((data) => console.log(data))

// knex.select('*')
// .from('player_stats_per_game')
// .rightOuterJoin(playerGames, 'player_stats_per_game.game_id', 'player_games.team_game_id')
// .then((data) => console.log(data.filter((el) => el.game_id === null).length))

//Below is another option, but not very good.

// .then(data => {
//   return knex('player_stats_per_game').select('game_id')
// })
// .then((data2) => {
//   cb(data2)
// })

// const q1 = knex...
// const q2 = knex...

// const nonPlayedGames = Promise.all([q1, q2])
// .then(values => {
//   const [d1, d2] = values;

//   knex...

//   return results;
// });





// const getPlayerPlayedGames = (teamGamesArray, cb2) => {
//   knex('player_stats_per_game').select('game_id')
//   .then((playerGamesArray) => {
//     cb2(teamGamesArray, playersGamesArray)
//   })
// }

// const compareArrays = (teamGamesArray, playersGamesArray) => {

// }

// playerGamesArray(getPlayerGames, compareArrays)


// el.player_id === 96 && el.player_game_id === el.game_id


// knex('players').select('players.id as player_id', 'teams.id as team_id', 'teams.api_id as team_api_id', 'player_stats_per_game.game_id as player_game_id')
// .leftJoin('teams', 'players.team_id', 'teams.id')
// .innerJoin('player_stats_per_game', 'player_stats_per_game.player_id', 'players.id')
// .then((data) => console.log(data.length))

// knex('players').select('players.id as player_id', 'player_stats_per_game.game_id as player_game_id')
// .crossJoin('player_stats_per_game', 'player_stats_per_game.player_id', 'players.id')
// .then((data) => console.log(data))

// knex.select('players.id as player_id', 'player_stats_per_game.game_id as game_id').from('players')
// .leftJoin('player_stats_per_game', 'players.id', 'player_stats_per_game.player_id')
// .join('games', 'game_id', 'games.id')
// .then((data) => console.log(data.filter((el) => el.player_id === 96)))


// knex('games').select('*')
// .leftJoin('teams', 'teams.api_id', 'games.home_id')
// .then((data) => console.log(data.length))


// knex.select('*')
// .from('players')
// .crossJoin('player_stats_per_game', 'player_stats_per_game.player_id', 'players.id')
// .then((data) => console.log(data))
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