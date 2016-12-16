exports.seed = function(knex, Promise) {
  return knex('custom_teams').del()
    .then(function () {
      return Promise.all ([
        knex('custom_teams').insert ({
          user_id: 1,
          name: "Killer Team"
        })
      ]);
    });
  };