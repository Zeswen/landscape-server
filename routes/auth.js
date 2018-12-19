const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/User");
const uploadCload = require("../config/cloudinary");
const bcrypt = require("bcrypt");
const bcryptSalt = 12;

router.post("/signup", (req, res) => {
  const { email, password } = req.body;
  if (email === "" || password === "") {
    res.status(400).json({ message: "Indicate email and password" });
    return;
  }

  User.findOne({ email }, "email", (err, user) => {
    if (user !== null) {
      res.status(500).json({ message: "The email already exists" });
      return;
    }

    const hashPass = bcrypt.hashSync(password, bcrypt.genSaltSync(bcryptSalt));

    const newUser = new User({
      email,
      password: hashPass
    });

    newUser.save()
      .then(user => {
        req.login(user, (err) => {
          if (err) {
            res.status(500).json({ message: 'Login after signup went bad.' });
            return;
          }
        });
        res.status(200).json(newUser);
      })
      .catch((err) => {
        console.log(err)
        res.status(500).json({ message: "Something went wrong" });
      });
  });
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, theUser, failureDetails) => {
      if (err) {
          console.log(err)
          res.status(500).json({ message: 'Something went wrong authenticating user' });
          return;
      }
  
      if (!theUser) {
          res.status(401).json(failureDetails);
          return;
      }

      // save user in session
      req.login(theUser, (err) => {
          if (err) {
              res.status(500).json({ message: 'Session save went bad.' });
              return;
          }
          res.status(200).json(theUser);
      });
  })(req, res, next);
});

router.get("/logout", (req, res) => {
  req.logout();
  res.status(200).json({ message: "Log out success!" });
});

router.get("/loggedin", (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json(req.user);
    return;
  }
  res.status(403).json({ message: "Unauthorized" });
});

module.exports = router;
