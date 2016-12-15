exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('players').insert({email: 'alice@test.com', password: "alice"}),
        knex('players').insert({email: 'bob@test.com', password: 'bob'}),
      ]);
    });
  };
