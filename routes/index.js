const express = require('express');
const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.use('/api/auth', require('./auth'));

router.use('/api/pages', require('./pages'));

module.exports = router;
