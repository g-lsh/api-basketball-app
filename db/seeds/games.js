exports.seed = function(knex, Promise) {
  return knex('games').del()
    .then(function () {
      return Promise.all([knex('games').insert
        ({
          team_A_id: 1,
          team_B_id: 2,
          seaon: 2013,
          custom_team_id: 1,
          head_shot: "http://a3.espncdn.com/combiner/i?img=%2Fi%2Fheadshots%2Fnba%2Fplayers%2Ffull%2F2384.png",
          college: "SW Atlanta Christian Academy (GA)/USA",
          height: 211,
          weight: 250,
        }),
        knex('players').insert({email: 'bob@test.com', password: 'bob'}),
      ]);
    });
  };
