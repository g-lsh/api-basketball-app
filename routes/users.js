"use strict";

const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt');

module.exports = (knex) => {

  router.post("/signup", (req, res) => {
    if (!req.body) {
      console.log("No body in the request");
      res.status(400).send("The body of the request is empty");
    }

    let {email, password} = req.body;
    debugger;
    const checkEmail  = (cb) => {
      let existingEmail = "";
      knex('users')
        .select('id', 'email')
        .where('email', email)
        .then((userArray) => {
          if (userArray[0]) {
            existingEmail = userArray[0].email;
          }
          if (!existingEmail) {
            cb();
          } else {
            res.status(400).send(`The email adress: ${existingEmail} already exists.`);
          }
        });
    }

    const insertNewUser = () => {
      knex('users')
        .insert({
         email: email,
         password: bcrypt.hashSync(password, 10)
       }, 'id')
        .then((arrayOfId) => {
          debugger;
          let user_id = arrayOfId[0];
          res.json(user_id);
        })
        .catch((err) => {
          res.status(400);
        });
    }

    checkEmail(insertNewUser);

  });

  return router;
}