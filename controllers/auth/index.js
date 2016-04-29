var express = require('express');
var router = express.Router();

var User = require('../../models/auth/user');

var controller = {

  index : function(req, res, next) {

    res.render('auth/index', { title: 'auth', titles : [
      {name : 'HOME', href : '/'},
      {name : 'auth', href : '/auth/'},
      {name : 'register', href : '/auth/register/'},

    ] });

  },

  loginPost : function(req, res, next){
    var email = req.body.email;
    var password = req.body.password;

    res.redirect(302, '/admin/');

  },

  logout : function(req, res, next){

  },

  register : function(req, res, next){
    res.render('auth/register', { title: 'auth', titles : [
      {name : 'HOME', href : '/'},
      {name : 'auth', href : '/auth/'},
      {name : 'register', href : '/auth/register/'},
    ] });
  },

  registerPost : function(req, res, next){
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var password2 = req.body.password2;
    var date = new Date();

    new User({
      name : name,
      email : email,
      password : password,
      create_date : date,
      last_edit_date : date,
    }).save(function(err){
          if(err){
            console.log(err);
          }else {
            console.log('that was easy..');
            res.redirect(302, '/admin/');
          }

        });
  },


};


router.get('/logout/', controller.logout);
router.post('/login/', controller.loginPost);
router.get('/register/', controller.register);
router.post('/register/', controller.registerPost);
router.get('/', controller.index);

module.exports = router;
