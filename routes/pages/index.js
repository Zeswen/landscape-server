const express = require('express');
const pageRouter  = express.Router();
const User = require("../../models/User");
const Page = require("../../models/Page");
const parser = require("../../config/cloudinary");

pageRouter.post('/newPage', (req, res, next) => {
    const urlParser = (str) => str.split(' ').join('').replace(/([^A-Za-z0-9])/ig, '')

    let newPage = {
        title: req.body.title,
        url: urlParser(req.body.title),
        owner: req.body.id,
        structure: {
            header: {
                title: 'My Logo',
                imgUrl: null,
                backgroundColor:'#F0FFF1',
                position: 'left',
                height: 60,
                paddingV: 16,
                paddingH: 8,
                hasMenu: true,
                menuSize: 32,
                isReverse: false,
                fontFamily: 'Roboto',
                fontSize: 32,
                color: '#2d2d2d'
            },
            sections: [
                {  
                    id: 1,
                    title: 'My Section',
                    description: 'This is my first section',
                    backgroundImg: null,
                    backgroundColor: '#2c2c2d',
                    position: 'top',
                    height: 295,
                    paddingV: 4,
                    paddingH: 12,
                    textAlign: 'center',
                    titleFontFamily: 'Roboto',
                    titleFontSize: 32,
                    titleColor: '#F0FFF1',
                    descriptionFontFamily: 'Roboto',
                    descriptionFontSize: 32,
                    descriptionColor: '#F0FFF1',
                },
                {  
                    id: 2,
                    title: 'The Section',
                    description: 'This is my second section',
                    backgroundImg: null,
                    backgroundColor: "#2c2965",
                    position: 'top',
                    height: 170,
                    paddingV: 16,
                    paddingH: 8,
                    textAlign: 'center',
                    titleFontFamily: 'Roboto',
                    titleFontSize: 32,
                    titleColor: '#F0FFF1',
                    descriptionFontFamily: 'Roboto',
                    descriptionFontSize: 32,
                    descriptionColor: '#F0FFF1',
                }
            ],
            footer: {
                owner: 'Pepe',
                backgroundColor: '#c8c8c9',
                position: 'auto',
                height: 140,
                paddingV: 16,
                paddingH: 8,
                isReverse: false,
                hasCopyright: true,
                copyrightFontFamily: 'Roboto',
                copyrightFontSize: 12,
                copyrightColor: '#000000',
                ownerFontFamily: 'Roboto',
                ownerFontSize: 16,
                ownerColor: '#000000',
                social: [
                    {
                        active: false,
                        name: 'Facebook',
                        url: ''
                    },
                    {
                        active: true,
                        name: 'Twitter',
                        url: 'http://www.twitter.com/twitter'
                    },
                    {
                        active: true,
                        name: 'Instagram',
                        url: 'http://www.instagram.com/instagram'
                    },
                ],
            }
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
    Page.findOne({url: req.body.url})
        .then(page => res.status(200).json(page))
        .catch(err => console.log(err));
})

pageRouter.post('/updatePage', (req, res, next) => {
    Page.findById(req.body._id)
        .then(page => {
            if (req.user.id == page.owner) {
                page.update({...req.body})
                    .then(()=> res.status(200).json({ message: 'Saved Succesfully' }))
                    .catch(err => {
                        console.log(err)
                        return res.status(500).json({ message: 'Please try again' }
                    )})
            }
        })
        .catch(err => {
            console.log(err)
            return res.status(500).json({ message: 'Please try again' }
        )})
})

pageRouter.post('/photoUpload', parser.single('image'), (req, res, next) => {
    if (req.file && req.file.url) {
        return res.status(200).json({ imgUrl: req.file.url });
    }

    return res.status(500).json({ message: 'There was an error uploading the image' });
});


module.exports = pageRouter;
