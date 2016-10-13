var express = require('express');
var router = express.Router();



var controller = {

  index : function(req, res, next) {
      console.log("index...");
    res.render('home/index', {
      title: 'Mingz',
      titles : [
        {name : 'HOME', href : '/'},
        {name : 'BLOG', href : '/blog/'},
        {name : 'GAMES', href : '/games/'},
        {name : 'ABOUT', href : '/about/'}
      ]
    });

  },

};


router.get('/', controller.index);
module.exports = router;
