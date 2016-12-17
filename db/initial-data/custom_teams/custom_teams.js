exports.seed = function(knex, Promise) {

  return Promise.all ([
    knex('custom_teams').insert ({
      user_id: 1,
      name: "Killer Team"
    })
  ]);
};