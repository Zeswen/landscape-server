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
                imgUrl: null,
                backgroundColor:'#F0FFF1',
                position: 'center',
                hasMenu: false,
                menuSize: 32,
                isReverse: false,
                fontFamily: 'Roboto',
                fontSize: 32,
                color: '#8367C7'
            },
            sections: [
                {  
                    id: 1,
                    title: 'My Section',
                    description: 'This is my first section',
                    imgUrl: null,
                    backgroundImg: null,
                    backgroundColor: '#8367C7',
                    position: 'top',
                    height: 300,
                    textAlign: 'center',
                    titleFontFamily: 'Roboto',
                    titleFontSize: 32,
                    titleColor: '#F0FFF1',
                    descriptionFontFamily: 'Roboto',
                    descriptionFontSize: 32,
                    descriptionColor: '#F0FFF1',
                }
            ],
            footer: null
        },
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
