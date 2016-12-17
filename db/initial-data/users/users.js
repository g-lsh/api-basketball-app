exports.seed = function(knex, Promise) {

  return Promise.all([
    knex('users').insert({email: 'alice@test.com', password: "alice"}).returning("*"),
    knex('users').insert({email: 'bob@test.com', password: 'bob'}).returning("*"),
  ])
};