/**
 * Author: zhaojm
 * Email: <mingzz2013@gmail.com>
 * Create Time: 15/6/21
 */
var express = require('express');
var router = express.Router();
var users = require('./users');



router.use('/users/', users);
router.use('/', users);
module.exports = router;