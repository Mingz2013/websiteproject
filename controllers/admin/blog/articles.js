/**
 * Author: zhaojm
 * Email: <mingzz2013@gmail.com>
 * Create Time: 15/8/21
 */

var express = require('express');
var router = express.Router();
var Article = require('../../../models/blog/article');
var User = require('../../../models/auth/user');
//var Category = require('../../models/blog/category');

var controller = {

    index : function(req, res, next) {


        Article.ArticleModel.find()
            .populate('author')
            .exec(function(err, totalArticles) {

                console.log(totalArticles);

                var articles = totalArticles.map(function (article) {
                    return {
                        title: article.title,
                        create_date: article.getCreateDateString(),
                        last_edit_date : article.getLastEditDateString(),
                        author : article.author.name,
                        category : article.category,
                    }
                });

                res.render('admin/blog/articles/index', {
                    title: 'admin blog',
                    titles: [
                        //{name : 'HOME', href : '/'},
                        {name : 'ADMIN', href : '/admin/'},
                        {name : 'BLOG', href : '/admin/blog/'},
                        {name : 'GAMES', href : '/admin/games/'},
                        {name : 'AUTH', href : '/admin/auth/'},
                        {name : 'ABOUT', href : '/admin/about/'},
                    ],

                    subTitles: [
                        {name : 'Articles', href : '/admin/blog/articles'},
                        {name : 'Categorys', href : '/admin/blog/categorys'},
                        {name : 'Tags', href : '/admin/blog/tags'},
                        {name : 'Comments', href : '/admin/blog/comments'},

                    ],

                    buttons : [
                        {name: 'create', href: '/admin/blog/articles/create'},
                    ],

                    tableTitles: ['title', 'create date', 'last edit date', 'author', 'category'],

                    articles : articles,

                });
            });

    },



    create : function(req, res, next) {


        res.render('admin/blog/articles/create', {
            title: 'admin blog',
            titles: [
                //{name : 'HOME', href : '/'},
                {name : 'ADMIN', href : '/admin/'},
                {name : 'BLOG', href : '/admin/blog/'},
                {name : 'GAMES', href : '/admin/games/'},
                {name : 'AUTH', href : '/admin/auth/'},
                {name : 'ABOUT', href : '/admin/about/'},
            ],

            subTitles: [
                {name : 'Articles', href : '/admin/blog/articles'},
                {name : 'Categorys', href : '/admin/blog/categorys'},
                {name : 'Tags', href : '/admin/blog/tags'},
                {name : 'Comments', href : '/admin/blog/comments'},

            ],





        });

    },

    createPost : function(req, res, next) {

        console.log(req.body);

        var date = new Date();

        User.UserModel.findOne({ name : req.body.author }, function(err, user){

            console.log(err);
            console.log(user);


            var months_en = ["January","February","March","April","May","June","July","August","September","October","November","December"];

            new Article.ArticleModel({
                title : req.body.title,
                content : req.body.content,
                create_date : date,
                last_edit_date : date,
                author : user.id,
                archive : {
                    str : months_en[date.getMonth()] + " " + date.getFullYear(),
                    year : date.getFullYear(),
                    month : date.getMonth() + 1,
                },
                category : req.body.category,

            }).save(function(err){
                    if(err){
                        console.log(err);
                    }else {
                        console.log('that was easy..');
                        res.redirect(302, '/admin/blog/');

                    }

                });




        });



    },

    article : function(req, res, next) {

        var title = req.params.title;

        Article.ArticleModel.findOne({title : title})
            .populate('author')
            .exec(function(err, article) {

                var article = {
                    title: article.title,
                    create_date: article.getCreateDateString(),
                    last_edit_date : article.getLastEditDateString(),
                    content : article.content,
                    author : article.author.name,
                };


                console.log(article);


                res.render('admin/blog/articles/article', {
                    title: 'admin blog',
                    titles: [
                        //{name : 'HOME', href : '/'},
                        {name : 'ADMIN', href : '/admin/'},
                        {name : 'BLOG', href : '/admin/blog/'},
                        {name : 'GAMES', href : '/admin/games/'},
                        {name : 'AUTH', href : '/admin/auth/'},
                        {name : 'ABOUT', href : '/admin/about/'},
                    ],

                    subTitles: [
                        {name : 'Articles', href : '/admin/blog/articles'},
                        {name : 'Categorys', href : '/admin/blog/categorys'},
                        {name : 'Tags', href : '/admin/blog/tags'},
                        {name : 'Comments', href : '/admin/blog/comments'},

                    ],

                    buttons : [
                        {name: 'Edit', href: '/admin/blog/articles/edit/' + article.title},
                        {name: 'remove', href: '/admin/blog/articles/remove/' + article.title},
                    ],

                    article: article,


                });
            });


    },

    edit : function(req, res, next) {

        var title = req.params.title;

        Article.ArticleModel.findOne({title : title})
            .populate('author')
            .exec(function(err, article) {
                var article = {
                    title: article.title,
                    create_date: article.getCreateDateString(),
                    last_edit_date : article.getLastEditDateString(),
                    content : article.content,
                    author : article.author.name,
                };

                console.log(article);

                res.render('admin/blog/articles/edit', {
                    title: 'admin blog',
                    titles: [
                        //{name : 'HOME', href : '/'},
                        {name : 'ADMIN', href : '/admin/'},
                        {name : 'BLOG', href : '/admin/blog/'},
                        {name : 'GAMES', href : '/admin/games/'},
                        {name : 'AUTH', href : '/admin/auth/'},
                        {name : 'ABOUT', href : '/admin/about/'},
                    ],

                    subTitles: [
                        {name : 'Articles', href : '/admin/blog/articles'},
                        {name : 'Categorys', href : '/admin/blog/categorys'},
                        {name : 'Tags', href : '/admin/blog/tags'},
                        {name : 'Comments', href : '/admin/blog/comments'},

                    ],

                    article : article,

                });

            });



    },

    update : function(req, res, next) {
        console.log('body,..:', req.body);
        var date = new Date();
        Article.ArticleModel.update({
            title : req.body.title,
            content : req.body.content,
            last_edit_date : date,
            //author : req.body.author,
        }, function(err){
            if(err){
                console.log(err);
            }else{
                res.redirect(302, '/admin/blog/articles/article/' + req.body.title);
            }
        });

    },

    remove : function(req, res, next){
        Article.ArticleModel.remove({
            title : req.params.title
        }, function(err){
            if(err){
                console.log(err);
            }else{
                res.redirect(302, '/admin/blog/articles');
            }
        })
    },

};

router.get('/remove/:title', controller.remove);
router.post('/update/', controller.update);
router.get('/edit/:title', controller.edit);
router.get('/article/:title', controller.article);
router.post('/create', controller.createPost);
router.get('/create', controller.create);
router.get('/', controller.index);
module.exports = router;