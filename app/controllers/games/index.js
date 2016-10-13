var express = require('express');
var router = express.Router();

var Game = require('../../models/games/game');



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

      res.render('games/index', {
        title: 'GAMES',
        titles: [
          //{name: 'HOME', href: '/'},
          {name: 'GAMES', href: '/games/'},
          {name: 'NEWEST', href: '/games/newest/'},
          {name: 'TOP', href: '/games/top/'},
          {name: 'CATEGORY', href: '/games/category/'},
          {name: 'ABOUT', href: '/about/'}
        ],


        games: games,

      });

    });

  },




  game : function(req, res, next) {

    var title = req.params.title;

    Game.findOne({title : title}, function(err, game){

      console.log(game);


      var game = {
        title: game.title,
        create_date: game.getCreateDateString(),
        last_edit_date: game.getLastEditDateString(),
        description : game.description,
        author : game.author,
        url : game.url,
      };

      res.render('games/game', {
        title: 'GAMES',
        titles: [
          //{name: 'HOME', href: '/'},
          {name: 'GAMES', href: '/games/'},
          {name: 'NEWEST', href: '/games/newest/'},
          {name: 'TOP', href: '/games/top/'},
          {name: 'CATEGORY', href: '/games/category/'},
          {name: 'ABOUT', href: '/about/'}
        ],

        game : game,

      });


    });

  },

  static_game : function(req, res, next){

  },

  newest : function(req, res, next){
    res.render('games/newest', {
      title: 'GAMES',
      titles: [
        //{name: 'HOME', href: '/'},
        {name: 'GAMES', href: '/games/'},
        {name: 'NEWEST', href: '/games/newest/'},
        {name: 'TOP', href: '/games/top/'},
        {name: 'CATEGORY', href: '/games/category/'},
        {name: 'ABOUT', href: '/about/'}
      ],



      games : [],

    });
  },
  top : function(req, res, next){
    res.render('games/top', {
      title: 'GAMES',
      titles: [
        //{name: 'HOME', href: '/'},
        {name: 'GAMES', href: '/games/'},
        {name: 'NEWEST', href: '/games/newest/'},
        {name: 'TOP', href: '/games/top/'},
        {name: 'CATEGORY', href: '/games/category/'},
        {name: 'ABOUT', href: '/about/'}
      ],



      games : [],

    });
  },
  category : function(req, res, next){
    res.render('games/category', {
      title: 'GAMES',
      titles: [
        //{name: 'HOME', href: '/'},
        {name: 'GAMES', href: '/games/'},
        {name: 'NEWEST', href: '/games/newest/'},
        {name: 'TOP', href: '/games/top/'},
        {name: 'CATEGORY', href: '/games/category/'},
        {name: 'ABOUT', href: '/about/'}
      ],



      games : [],

    });
  },



};

router.get('/category', controller.category);
router.get('/top', controller.top);
router.get('/newest', controller.newest);
router.get('/static:url', controller.static_game);
router.get('/game:title', controller.game);
router.get('/', controller.index);
module.exports = router;
