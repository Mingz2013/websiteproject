/**
 * Author: zhaojm
 * Email: <mingzz2013@gmail.com>
 * Create Time: 15/8/21
 */
var express = require('express');
var router = express.Router();
var About = require('../../../models/about/about');
var User = require('../../../models/auth/user');

var controller = {

    index: function (req, res, next) {

        About.AboutModel.findOne().exec(function(err, about){

            if(!about){
                about = {content : ""};
            }
            res.render('admin/about/index', {
                title: 'admin about',
                titles: [
                    //{name : 'HOME', href : '/'},
                    {name: 'ADMIN', href: '/admin/'},
                    {name: 'BLOG', href: '/admin/blog/'},
                    {name: 'GAMES', href: '/admin/games/'},
                    {name: 'AUTH', href: '/admin/auth/'},
                    {name: 'ABOUT', href: '/admin/about/'},
                ],



                buttons: [
                    {name: 'edit', href: '/admin/about/edit'},
                ],

                about : about,



            });


        });



    },

    edit : function (req, res, next){
        About.AboutModel.findOne().exec(function(err, about){

            if(!about){
                about = {content : ""};
            }
            res.render('admin/about/edit', {
                title: 'admin about',
                titles: [
                    //{name : 'HOME', href : '/'},
                    {name: 'ADMIN', href: '/admin/'},
                    {name: 'BLOG', href: '/admin/blog/'},
                    {name: 'GAMES', href: '/admin/games/'},
                    {name: 'AUTH', href: '/admin/auth/'},
                    {name: 'ABOUT', href: '/admin/about/'},
                ],

                about : about,


            });


        });

    },


    update : function (req, res, next){


        About.AboutModel.findOne().exec(function(err, about){

            var date = new Date();

            if(!about) {
                User.UserModel.findOne({ name : req.body.author }, function(err, user) {
                    new About.AboutModel({
                        //title : req.body.title,
                        content: req.body.content,
                        create_date: date,
                        last_edit_date: date,
                        author: user.id,

                    }).save(function (err) {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log('that was easy..');
                                res.redirect(302, '/admin/about/');

                            }

                        });
                });

            }else {

                About.AboutModel.update({
                    //title: req.body.title,
                    content: req.body.content,
                    last_edit_date: date,
                    //author : req.body.author,
                }, function (err) {
                    if (err) {
                        console.log(err);
                    } else {
                        res.redirect(302, '/admin/about/');
                    }
                });
            }

        });

    },






};

router.post('/update', controller.update);
router.get('/edit', controller.edit);
router.get('/', controller.index);
module.exports = router;