
const insertTwitter = (knex) => {
  const baseUrl = 'http://www.twitter.com/';
  let specialTeams = [
    {name: 'Thunder', twitter: 'okcthunder'},
    {name: 'Pelicans', twitter: 'pelicansnba'},
    {name: 'Mavericks', twitter: 'dallasmavs'},
    {name: 'Knicks', twitter: 'nyknicks'},
    {name: 'Clippers', twitter: 'laclippers'},
    {name: 'Magic', twitter: 'orlandomagic'},
    {name: 'Cavaliers', twitter: 'cavs'},
    {name: 'Rockets', twitter: 'houstonrockets'},
    {name: 'Nets', twitter: 'brooklynnets'},
    {name: 'Jazz', twitter: 'utahjazz'},
    {name: 'Hawks', twitter: 'atlhawks'},
    {name: 'Pistons', twitter: 'detroitpistons'},
    {name: 'Bulls', twitter: 'chicagobulls'},
    {name: 'Wizards', twitter: 'washwizards'},
    {name: 'Heat', twitter: 'miamiheat'},
    {name: 'Grizzlies', twitter: 'memgrizz'},
    {name: 'Trail Blazers', twitter: 'trailblazers'},
    {name: 'Kings', twitter: 'sacramentokings'},
    {name: '76ers', twitter: 'sixers'},
  ]

  knex('teams')
  .select('name')
  .then((namesArray) => {
    namesArray.forEach((nameObject) => {
      const name = nameObject.name;
      let specialTeam = specialTeams.find((team) => team.name === name);
      let twitter = baseUrl;
      if (specialTeam) {
        twitter += specialTeam.twitter;
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

module.exports = insertTwitter;
