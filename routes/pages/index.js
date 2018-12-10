const express = require('express');
const pageRouter  = express.Router();
const User = require("../../models/User");
const Page = require("../../models/Page");

pageRouter.post('/newPage', (req, res, next) => {
    let newPage = {
        title: req.body.title,
        url: `localhost:5000/${req.body.title}`,
        owner: req.body.id,
        structure: {},
        colors: ['#360568', '#5B2A86', '#7785AC', '#9AC6C5', '#A5E6BA', '#31263E', '#221E22', '#52528C', '#7C9EB2', '#CBC0AD'],
        fonts: ["Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", 'sans-serif']
    }

    Page.create(newPage)
        .then(page => {
            User.findByIdAndUpdate(req.body.user.id, { $push: { Pages: page } })
                .then(user => res.json(user))
                .catch(err => res.status(500).json({ message: err }))
        })
});

module.exports = pageRouter;
