
const insertDivision = (knex) => {

  const eastTeams = [
    'Hawks',
    'Celtics',
    'Bobcats',
    'Bulls',
    'Cavaliers',
    'Pistons',
    'Pacers',
    'Heat',
    'Bucks',
    'Nets',
    'Knicks',
    'Magic',
    '76ers',
    'Raptors',
    'Wizards'
  ];

  knex('teams').select('name')
  .then((namesArray) => {
    namesArray.forEach((team) => {
      const eastTeam = eastTeams.find((name) => name === team.name);
      let division = false;

      if (eastTeam) {
        division = true;
      }
      knex('teams')
      .where('name', team.name)
      .update('division', division)
      .then((data) => {
        console.log(`Division updated for ${team.name}`);
      })
      .catch((err) => {
        console.log(`Error when updating division for ${team.name}`, err);
      })
    })
  })
}

module.exports = insertDivision;
