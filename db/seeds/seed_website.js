
const insertWebsite = (knex) => {
  const baseUrl = 'http://www.nba.com/';
  knex('teams')
  .select('name')
  .then((namesArray) => {
    namesArray.forEach((nameObject) => {
      const name = nameObject.name;
      let website = baseUrl;
      if (name === 'Trail Blazers') {
        website += 'blazers';
      } else {
          website += name.toLowerCase();
      }
       knex('teams')
      .update('website', website)
      .where('name', nameObject.name)
      .then((data) => {
        console.log('Website inserted into teams');
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

module.exports = insertWebsite;
