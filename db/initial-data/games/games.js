exports.seed = function(knex, Promise, users, callback) {

  return Promise.all ([
    knex('games').insert ({
      team_A_id: 1,
      team_B_id: 2,
      season: 2013,
      date: "2016-10-19"
    })
  ])
};
