var express = require('express');
var router = express.Router();

var blog = require('./blog/index');
var games = require('./games/index');
var auth = require('./auth/index');
var home = require('./home/index');
var about = require('./home/about');


router.use('/blog/', blog);
router.use('/games/', games);
router.use('/auth/', auth);
router.use('/about/', about);
router.get('/', home);

module.exports = router;
