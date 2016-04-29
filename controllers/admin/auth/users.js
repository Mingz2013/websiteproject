/**
 * Author: zhaojm
 * Email: <mingzz2013@gmail.com>
 * Create Time: 15/8/21
 */

var express = require('express');
var router = express.Router();
var User = require('../../../models/auth/user');

var controller = {

    index : function(req, res, next) {

        User.UserModel.find(function(err, totalUsers) {

            console.log(totalUsers);

            var users = totalUsers.map(function (user) {
                return {
                    name : user.name,
                    email : user.email,
                    password : user.password,
                    create_date: user.getCreateDateString(),
                    last_edit_date : user.getLastEditDateString(),
                }
            });

            res.render('admin/auth/users/index', {
                title: 'admin auth',
                titles: [
                    //{name : 'HOME', href : '/'},
                    {name : 'ADMIN', href : '/admin/'},
                    {name : 'BLOG', href : '/admin/blog/'},
                    {name : 'GAMES', href : '/admin/games/'},
                    {name : 'AUTH', href : '/admin/auth/'},
                    {name : 'ABOUT', href : '/admin/about/'},
                ],
                subTitles: [

                ],

                buttons : [
                    {name: 'create', href: '/admin/auth/users/create'}
                ],

                tableTitles: ['name', 'email', 'password', 'create date', 'last edit date'],

                users : users,

            });
        });

    },



    create : function(req, res, next) {


        res.render('admin/auth/users/create', {
            title: 'admin auth',
            titles: [
                //{name : 'HOME', href : '/'},
                {name : 'ADMIN', href : '/admin/'},
                {name : 'BLOG', href : '/admin/blog/'},
                {name : 'GAMES', href : '/admin/games/'},
                {name : 'AUTH', href : '/admin/auth/'},
                {name : 'ABOUT', href : '/admin/about/'},
            ],
            subTitles: [

            ],





        });

    },

    createPost : function(req, res, next) {

        console.log(req.body);

        var date = new Date();

        new User.UserModel({
            name : req.body.name,
            email : req.body.email,
            password : req.body.password,
            create_date : date,
            last_edit_date : date,
        }).save(function(err){
                if(err){
                    console.log(err);
                }else {
                    console.log('that was easy..');
                    res.redirect(302, '/admin/auth/users/');

                }

            });

    },



    edit : function(req, res, next) {

        var name = req.params.name;

        User.UserModel.findOne({name : name}, function(err, user) {
            var user = {
                name : user.name,
                email : user.email,
                password : user.password,
                create_date: user.getCreateDateString(),
                last_edit_date : user.getLastEditDateString(),

            };

            console.log(user);

            res.render('admin/auth/users/edit', {
                title: 'admin auth',
                titles: [
                    //{name : 'HOME', href : '/'},
                    {name : 'ADMIN', href : '/admin/'},
                    {name : 'BLOG', href : '/admin/blog/'},
                    {name : 'GAMES', href : '/admin/games/'},
                    {name : 'AUTH', href : '/admin/auth/'},
                    {name : 'ABOUT', href : '/admin/about/'},
                ],
                subTitles: [

                ],

                buttons : [
                    {name: 'create', href: '/admin/auth/users/create'}
                ],

                user : user,

            });

        });



    },

    update : function(req, res, next) {
        console.log('body,..:', req.body);
        var date = new Date();
        User.UserModel.update({
            name : req.body.name,
            email : req.body.email,
            password : req.body.password,
            create_date : date,
            last_edit_date : date,
        }, function(err){
            if(err){
                console.log(err);
            }else{
                res.redirect(302, '/admin/auth/users/');
            }
        });

    },

    remove : function(req, res, next){
        User.UserModel.remove({
            name : req.params.name,
        }, function(err){
            if(err){
                console.log(err);
            }else{
                res.redirect(302, '/admin/auth/users/');
            }
        })
    },

};

router.get('/remove/:name', controller.remove);
router.post('/update/', controller.update);
router.get('/edit/:name', controller.edit);
router.post('/create', controller.createPost);
router.get('/create', controller.create);
router.get('/', controller.index);
module.exports = router;