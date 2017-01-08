
const insertTwitter = (knex) => {
  const baseUrl = 'http://www.twitter.com/';
  knex('teams')
  .select('name')
  .then((namesArray) => {
    namesArray.forEach((nameObject) => {
      const name = nameObject.name;
      let twitter = baseUrl;
      if (name === 'Trail Blazers') {
        twitter += 'trailblazers';
      } else {
          twitter += name.toLowerCase();
      }
       knex('teams')
      .update('twitter', twitter)
      .where('name', nameObject.name)
      .then((data) => {
        console.log('Twitter inserted into teams');
      })
      .catch((err) => {
        throw err;
      })
    })
  })
  .catch((err) => {
    throw err;
  })
}

module.exports = insertTwitter
