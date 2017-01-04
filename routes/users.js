"use strict";

const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;
const authenticate = require('../authenticate/authenticate.js');

/*Functions to handle user login and registration*/
const checkEmail  = (knex, cb, email, password, bool, res) => {
  let existingEmail = null;
  let user_id = null;
  let hashedPassword = null;
  knex('users')
    .select('id', 'email', 'password')
    .where('email', email)
    .then((userArray) => {
      if (userArray[0]) {
        existingEmail = userArray[0].email;
        user_id = userArray[0].id;
        hashedPassword = userArray[0].password;
      }
      if (existingEmail) {
        if (bool) {
          cb(knex, existingEmail, user_id, hashedPassword, true, res);
        } else {
          cb(knex, email, null, null, false, res);
        }
      } else {
          if (bool) {
            cb(knex, email, null, null, false, res);
          } else {
            cb(knex, email, null, password, true, res);
          }
        }
    });
}

const insertNewUser = (knex, email, id, password, bool, res) => {
  if (!bool) {
    res.status(400).send(`The email adress: ${email} already exists.`);
    return
  } else {
    knex('users')
      .insert({
       email: email,
       password: bcrypt.hashSync(password, 10)
     }, 'id')
      .then((arrayOfId) => {
        const user_id = arrayOfId[0];
        const token = jwt.sign({
          email: email,
          user_id: user_id
        },jwtSecret);
        res.json({token});
      })
      .catch((err) => {
        console.log("error occured in insertNewUser:", err);
        /*return something, have to implement error handling*/;
      });
    }
}

/*-----------------------------------------------------------------------*/

module.exports = (knex) => {
/*Routes to handle user registration and login*/
  router.post("/signup", (req, res) => {

    if (!Object.keys(req.body).length) {
      res.status(400).send("The body of the request is empty.");
      return
    }
    const {email, password} = req.body;
    checkEmail(knex, insertNewUser, email, password, false, res);
  });

  router.post("/signin", authenticate, (req, res) => {
    if (req.currentUser) {
      const user = req.currentUser;
      res.status(400).json({ error: `already signed in as ${user.email}.`});
      return
    }
    if (!Object.keys(req.body).length) {
      res.status(400).send("The body of the request is empty.");
      return
    }
    const {email, password} = req.body;

    const checkPassword = (knex, email, id, hashedPassword, bool, res) => {
      if (!bool) {
        res.status(400).send("This email adress does not exist.")
        return
      }
      if (bcrypt.compareSync(password, hashedPassword)) {
        const token = jwt.sign({
          email: email,
          user_id: id
        },jwtSecret);
        res.json({token});
      } else {
        res.status(400).send("Wrong password.")
      }
    }

    checkEmail(knex, checkPassword, email, password, true, res);
  })

  return router;
}