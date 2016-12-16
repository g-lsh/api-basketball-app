exports.seed = function(knex, Promise, users, callback) {
  return knex('games').del()
    .then(function () {
      return Promise.all ([
        knex('games').insert ({
          team_A_id: 1,
          team_B_id: 2,
          seaon: 2013,
          date: 2016-10-19
        })
      ]).then(callback(null))
    });
  };
