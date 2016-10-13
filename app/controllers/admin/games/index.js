/**
 * Author: zhaojm
 * Email: <mingzz2013@gmail.com>
 * Create Time: 15/6/19
 */
var express = require('express');
var router = express.Router();
var Game = require('../../../models/games/game');

var controller = {

    index : function(req, res, next) {

        Game.find(function(err, totalGames) {

            console.log(totalGames);

            var games = totalGames.map(function (game) {
                return {
                    title: game.title,
                    create_date: game.getCreateDateString(),
                    last_edit_date: game.getLastEditDateString(),
                    description : game.description,
                    author : game.author,
                    url : game.url,
                }
            });

            res.render('admin/games/index', {
                title: 'admin games',
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
                    {name: 'create', href: '/admin/games/create'}
                ],

                tableTitles: ['title', 'description', 'create_date', 'last_edit_date', 'author'],

                games: games,

            });
        });

    },



    create : function(req, res, next) {


        res.render('admin/games/create', {
            title: 'admin games',
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

        new Game({
            title : req.body.title,
            description : req.body.description,
            create_date : date,
            last_edit_date : date,
            url : '',
        }).save(function(err){
                if(err){
                    console.log(err);
                }else {
                    console.log('that was easy..');
                    res.redirect(302, '/admin/games/');

                }

            });

    },

    game : function(req, res, next) {

        var title = req.params.title;

        Game.findOne({title : title}, function(err, game) {

            var game = {
                title: game.title,
                create_date: game.getCreateDateString(),
                last_edit_date : game.getLastEditDateString(),
                description : game.description,
                url : game.url,
            };


            console.log(game);


            res.render('admin/games/game', {
                title: 'admin games',
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
                    //{name: 'create', href: '/admin/games/create'},
                    {name: 'edit', href: '/admin/games/edit/' + game.title},
                    {name: 'remove', href: '/admin/games/remove/' + game.title},
                ],

                game: game,


            });
        });


    },

    edit : function(req, res, next) {

        var title = req.params.title;

        Game.findOne({title : title}, function(err, game) {
            var game = {
                title: game.title,
                create_date: game.getCreateDateString(),
                last_edit_date : game.getLastEditDateString(),
                description : game.description,
                url : game.url,
            };

            console.log(game);

            res.render('admin/games/edit', {
                title: 'admin games',
                titles: [
                    //{name : 'HOME', href : '/'},
                    {name : 'ADMIN', href : '/admin/'},
                    {name : 'BLOG', href : '/admin/blog/'},
                    {name : 'GAMES', href : '/admin/games/'},
                    {name : 'AUTH', href : '/admin/auth/'},
                    {name : 'ABOUT', href : '/admin/about/'},
                ],
                subTitles : [


                ],

                game : game,

            });

        });



    },

    update : function(req, res, next) {
        console.log('body,..:', req.body);
        var date = new Date();
        Game.update({
            title : req.body.title,
            description : req.body.description,
            last_edit_date : date,
            url : req.body.url,
        }, function(err){
            if(err){
                console.log(err);
            }else{
                res.redirect(302, '/admin/games/game/' + req.body.title);
            }
        });

    },

    remove : function(req, res, next){
        Game.remove({
            title : req.params.title
        }, function(err){
            if(err){
                console.log(err);
            }else{
                res.redirect(302, '/admin/games/');
            }
        })
    },

    static_game : function(req, res, next){

    },

};

router.get('/static:url', controller.static_game);
router.get('/remove/:title', controller.remove);
router.post('/update/', controller.update);
router.get('/edit/:title', controller.edit);
router.get('/game/:title', controller.game);
router.post('/create', controller.createPost);
router.get('/create', controller.create);
router.get('/', controller.index);
module.exports = router;