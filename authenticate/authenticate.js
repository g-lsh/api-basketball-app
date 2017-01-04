const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;
const ENV = process.env.ENV || "development";
const knexConfig  = require("../knexfile");
const knex = require('knex')(knexConfig[ENV]);

module.exports = (req, res, next) => {
  /*Authentication only checks whether token exists and is valid and adds a req header Currentuser.
  It is left to the routes to do what they will with non-authenticated users.*/
  const authentication = req.headers.authorization;

  let token;

  if (authentication) {
    token = authentication.split(' ')[1];
  }

  if (token) {
    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) {
        res.status(401).json({ error: 'Failed to authenticate' });
      } else {
          const {email, user_id} = decoded;
          knex('users')
            .select('id')
            .where('email', email)
            .then((userArray) => {
              if (userArray[0]) {
                const user = {email, id: user_id};
                req.currentUser = user;
                next();
              } else {
                res.status(404).json({error: 'User not found.'})
              }
            })
      }
    })
  } else {
    next()
  }
}