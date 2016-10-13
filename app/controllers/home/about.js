/**
 * Author: zhaojm
 * Email: <mingzz2013@gmail.com>
 * Create Time: 15/8/21
 */
var express = require('express');
var router = express.Router();
var About = require('../../models/about/about');



var controller = {


    index : function(req, res, next) {
        About.AboutModel.findOne().exec(function(err, about){
            if(!about){
                about = {content : ""};
            }
            res.render('home/about', {
                title: 'Mingz',
                titles : [
                    {name : 'HOME', href : '/'},
                    {name : 'BLOG', href : '/blog/'},
                    {name : 'GAMES', href : '/games/'},
                    {name : 'ABOUT', href : '/about/'}
                ],

                about : about,

            });
        });

    },

};


router.get('/', controller.index);
module.exports = router;
