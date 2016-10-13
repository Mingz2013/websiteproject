/**
 * Author: zhaojm
 * Email: <mingzz2013@gmail.com>
 * Create Time: 15/6/19
 */
var express = require('express');
var router = express.Router();
var articles = require('./articles');
var categorys = require('./categorys');
var comments = require('./comments');
var tags = require('./tags');



router.use('/articles/', articles);
router.use('/categorys/', categorys);
router.use('/comments/', comments);
router.use('/tags/', tags);
router.use('/', articles);
module.exports = router;