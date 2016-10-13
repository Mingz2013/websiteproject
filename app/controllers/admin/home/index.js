var express = require('express');
var router = express.Router();



var controller = {

  index : function(req, res, next) {

    res.render('admin/index', {
      title: 'ADMIN',
      titles : [
        //{name : 'HOME', href : '/'},
        {name : 'ADMIN', href : '/admin/'},
        {name : 'BLOG', href : '/admin/blog/'},
        {name : 'GAMES', href : '/admin/games/'},
        {name : 'AUTH', href : '/admin/auth/'},
        {name : 'ABOUT', href : '/admin/about/'},
      ]
    });

  },

};


router.get('/', controller.index);

module.exports = router;
