"use strict";

const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt');

module.exports = (knex) => {

  const checkEmail  = (cb, email, password, bool) => {
      let existingEmail = "";
      knex('users')
        .select('id', 'email')
        .where('email', email)
        .then((userArray) => {
          if (userArray[0]) {
            existingEmail = userArray[0].email;
            id = userArray[0].id;
          }
          if (existingEmail) {
            if (bool) {
              cb(existingEmail, id, password, true);
            } else {
              cb(email, id, password, false);
            }
          } else {
              if (bool) {
                cb(email, id, password, false)
              } else {
                cb(email, id, password, true)
              }
            }
        });
  }

  router.post("/signup", (req, res) => {
    if (!Object.keys(req.body).length) {
      res.status(400).send("The body of the request is empty");
      return
    }

    let {email, password} = req.body;

    const insertNewUser = (email, id, password, bool) => {
      if (!bool) {
        res.status(400).send(`The email adress: ${existingEmail} already exists.`);
        return
      } else {
        knex('users')
          .insert({
           email: email,
           password: bcrypt.hashSync(password, 10)
         }, 'id')
          .then((arrayOfId) => {
            let user_id = arrayOfId[0];
            res.json(user_id);
          })
          .catch((err) => {
            res.status(400);
          });
        }
    }

    checkEmail(insertNewUser, email, password, false);

  });

  router.post("/signin", (req, res) => {
    if (!Object.keys(req.body).length) {
      res.status(400).send("The body of the request is empty");
      return
    }

    let {email, password} = req.body;

    const checkPassword = (email, id, password, bool) => {
      if (bool) {
      //password sync check
      } else {
      //error message, email not found in databse
      }
    }

    checkEmail(checkPassword, email, password, true)
  })



  return router;
}