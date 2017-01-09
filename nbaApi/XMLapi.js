
const axios = require('axios');
const parseString = require('xml2js').parseString;

module.exports = (cb) => {
  const baseUrl = 'https://www.fantasybasketballnerd.com/service';
  return axios({
    method: 'post',
    url: `/players`,
    baseURL: baseUrl
    })
    .then((response) => {
      /*The api sends back XML, we use npm library xml2js to parse it.*/
      parseString(response.data, (err, result) => {
        /*rawData is an array of player objects
        player object: {PlayerId, name, team, position, height, weight, dob, school}*/
        let rawData = result['FantasyBasketballNerd']['Player'];
        let jsonData = JSON.stringify(rawData);
        cb(rawData);
      })
    })
    .catch(function (error) {
      console.log(error);
    });
}