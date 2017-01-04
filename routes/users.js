"use strict";

const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt');


  router.post("/signup", (req, res) => {
    if (!req.body) {
      console.log("No body in the request");
      res.status(400).send("The body of the request is empty");
    }

    let {email, password} = req.body;


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
        let user_id = arrayOfId[0];
        res.json(user_id);
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
    let {email, password} = req.body;
    checkEmail(knex, insertNewUser, email, password, false, res);
  });

  router.post("/signin", (req, res) => {
    if (!Object.keys(req.body).length) {
      res.status(400).send("The body of the request is empty.");
      return
    }
    let {email, password} = req.body;

    const checkPassword = (knex, email, id, hashedPassword, bool, res) => {
      if (!bool) {
        res.status(400).send("This email adress does not exist.")
        return
      }
      if (bcrypt.compareSync(password, hashedPassword)) {
        res.status(200);
        res.json(id);
      } else {
        res.status(400).send("Wrong password.")
      }
    }

    checkEmail(knex, checkPassword, email, password, true, res);
  })

  return router;
}