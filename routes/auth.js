const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/User");
const parser = require("../config/cloudinary");
const bcrypt = require("bcrypt");
const bcryptSalt = 5;

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
        req.login(user);
        res.status(200).json(newUser);
      })
      .catch(() => {
        res.status(500).json({ message: "Something went wrong" });
      });
  });
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user) => {
    if (err) {
      return res.status(500).json({ message: "Error on login" });
    }
    if (!user) {
      return res.status(500).json({ message: "Error on login" });
    }
    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json({message: "Error on login"});
      }
      return res.json(user);
    });
  })(req, res, next);
});

router.post("/edit", parser.single('photo'), (req, res) => {
  const { email, password } = req.body;

  const myUser = {};

  if (email) {
    myUser.email = email;
  }

  if (password) {
    myUser.password = password;
  }

  if (req.file) {
    myUser.imgUrl = req.file.url;
  }

  User.findByIdAndUpdate(req.user.id, myUser)
    .then(() => {
      res.json({ myUser });
  });
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
