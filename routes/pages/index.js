const express = require('express');
const pageRouter  = express.Router();
const User = require("../../models/User");
const Page = require("../../models/Page");

pageRouter.post('/newPage', (req, res, next) => {
    const urlParser = (str) => str.split(' ').join('').replace(/([^A-Za-z0-9])/ig, '')

    let newPage = {
        title: req.body.title,
        url: `localhost:5000/${urlParser(req.body.title)}`,
        owner: req.body.id,
        structure: {
            header: {
                title: 'My Logo',
                fontSize: 32,
                menuSize: 32,
                fontFamily: 'Roboto',
                color: '#8367C7',
                backgroundColor: '#F0FFF1',
                position: 'center',
                imgUrl: null,
                hasMenu: false,
                isReverse: false
            },
            sections: [
                {
                    title: 'My Section',
                    position: 'center',
                    description: 'This is my first section',
                    imgUrl: null,
                    color: '#F0FFF1',
                    backgroundColor: '#8367C7',
                    backgroundImg: null,
                    fontFamily: 'Roboto',
                    fontSize: 32
                }
            ],
            footer: null
        },
        colors: ['#360568', '#5B2A86', '#7785AC', '#9AC6C5', '#A5E6BA', '#31263E', '#221E22', '#52528C', '#7C9EB2', '#CBC0AD'],
        fonts: ["Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", 'sans-serif']
    }

    Page.create(newPage)
        .then(page => {
            User.findByIdAndUpdate(req.body.id, { $push: { pages: page } })
                .then(() => res.json({message: 'You created a new page'}))
                .catch(err => res.status(500).json({ message: err }))
        })
});

pageRouter.post('/getPage', (req, res, next) => {
    Page.findById(req.body.id)
        .then(page => res.status(200).json(page))
        .catch(err => console.log(err));
})

pageRouter.post('/updatePage', (req, res, next) => {
    Page.findOneAndUpdate({id: req.body.id}, { ...req.body })
        .then(() => res.status(200).json({ message: 'Saved Succesfully' }))
        .catch(err => {
            console.log(err)
            return res.status(500).json({ message: 'Please try again' }
        )})
})

module.exports = pageRouter;
