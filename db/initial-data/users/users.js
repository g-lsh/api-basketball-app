exports.seed = function(knex, Promise, callback) {
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({email: 'alice@test.com', password: "alice"}),
        knex('users').insert({email: 'bob@test.com', password: 'bob'}),
      ]).then((users) => {
        callback(users)
      })
    });
  };
