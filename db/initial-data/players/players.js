exports.seed = function(knex, Promise) {
  return knex('players').del()
    .then(function () {
      return Promise.all ([
        knex('players').insert ({
          first_name: "Dwight",
          last_name: "Howard",
          team_id: 1,
          custom_team_id: 1,
          head_shot: "http://a3.espncdn.com/combiner/i?img=%2Fi%2Fheadshots%2Fnba%2Fplayers%2Ffull%2F2384.png",
          college: "SW Atlanta Christian Academy (GA)/USA",
          height: 211,
          weight: 250,
        })
      ]);
    });
  };
