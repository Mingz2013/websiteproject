var express = require('express');
var router = express.Router();
var Article = require('../../models/blog/article');
var User = require('../../models/auth/user');


var controller = {



  index : function(req, res, next) {
    console.log("controller->index");
    //res.render('blog/test_index');

    Article.ArticleModel.find()
        .sort({create_date : -1})
        .populate('author')
        .exec(function(err, totalArticles){
          console.log("err->" + err);
          console.log("totals->" + totalArticles);

          var articles = totalArticles.map(function (article) {
            return {
              title: article.title,
              create_date: article.getCreateDateString(),
              last_edit_date : article.getLastEditDateString(),
              content : article.content,
              author : article.author.name,
            }
          });

          Article.ArticleModel.aggregate().group({_id:"$archive", count:{$sum:1}}).exec(function(err, archives){
            console.log("archives-->" , archives);



            res.render('blog/index', {
              title: 'Mingz',
              titles : [
                //{name : 'HOME', href : '/'},
                {name : 'BLOG', href : '/blog/'},
                {name : 'ARCHIVES', href : '/blog/archives/'},
                {name : 'CATEGORYS', href : '/blog/categorys/'},
                {name : 'TAGS', href : '/blog/tags/'},
                {name : 'ABOUT', href : '/about/'}
              ],


              articles : articles,
              archives : archives,

            });


          });


        });



  },

  author : function(req, res, next) {

    var author = req.params.author;
    console.log(author);
    User.UserModel.findOne({name: author}, function (err, user) {

      console.log(err);
      console.log(user);

      Article.ArticleModel.find({author: user.id})
          .sort({create_date : -1})
          .populate('author')
          //.select({author : {name : author}})
          .exec(function (err, totalArticles) {
            console.log("err->" + err);
            console.log("totalArticles->" + totalArticles);

            var articles = totalArticles.map(function (article) {
              return {
                title: article.title,
                create_date: article.getCreateDateString(),
                last_edit_date: article.getLastEditDateString(),
                content: article.content,
                author: article.author.name,
              }
            });

            Article.ArticleModel.aggregate().group({_id:"$archive", count:{$sum:1}}).exec(function(err, archives) {


              res.render('blog/index', {
                title: 'Mingz',
                titles: [
                  //{name : 'HOME', href : '/'},
                  {name: 'BLOG', href: '/blog/'},
                  {name : 'ARCHIVES', href : '/blog/archives/'},
                  {name : 'CATEGORYS', href : '/blog/categorys/'},
                  {name : 'TAGS', href : '/blog/tags/'},
                  {name: 'ABOUT', href: '/about/'}
                ],

                articles: articles,
                archives: archives,
              });
            });

          });
    });

  },

  archive : function(req, res, next) {



    var year = req.params.year;
    var month = req.params.month;

    console.log(year, month);

    console.log(new Date(year, month - 1, 1), new Date(year, month, 1));

    Article.ArticleModel.find({
          create_date : {
            "$gte": new Date(year, month - 1, 1),
            "$lt":new Date(year, month, 1)
          }
    })
        .populate('author')
        .sort({create_date : -1})
        .exec(function(err, totalArticles){
          console.log("err->" + err);
          console.log("totals->" + totalArticles);

          var articles = totalArticles.map(function (article) {
            return {
              title: article.title,
              create_date: article.getCreateDateString(),
              last_edit_date : article.getLastEditDateString(),
              content : article.content,
              author : article.author.name,
            }
          });

          Article.ArticleModel.aggregate().group({_id:"$archive", count:{$sum:1}}).exec(function(err, archives) {


            res.render('blog/index', {
              title: 'Mingz',
              titles: [
                //{name : 'HOME', href : '/'},
                {name: 'BLOG', href: '/blog/'},
                {name : 'ARCHIVES', href : '/blog/archives/'},
                {name : 'CATEGORYS', href : '/blog/categorys/'},
                {name : 'TAGS', href : '/blog/tags/'},
                {name: 'ABOUT', href: '/about/'}
              ],


              articles: articles,
              archives: archives,

            });
          });

        });

  },

  category : function(req, res, next) {

    Article.ArticleModel.aggregate().group({_id:"$archive", count:{$sum:1}}).exec(function(err, archives) {


      res.render('blog/index', {
        title: 'Mingz',
        titles: [
          //{name : 'HOME', href : '/'},
          {name: 'BLOG', href: '/blog/'},
          {name : 'ARCHIVES', href : '/blog/archives/'},
          {name : 'CATEGORYS', href : '/blog/categorys/'},
          {name : 'TAGS', href : '/blog/tags/'},
          {name: 'ABOUT', href: '/about/'}
        ],


        articles: [],
        archives: archives,

      });
    });

  },

  tag : function(req, res, next) {

    Article.ArticleModel.aggregate().group({_id:"$archive", count:{$sum:1}}).exec(function(err, archives) {


      res.render('blog/index', {
        title: 'Mingz',
        titles: [
          //{name : 'HOME', href : '/'},
          {name: 'BLOG', href: '/blog/'},
          {name : 'ARCHIVES', href : '/blog/archives/'},
          {name : 'CATEGORYS', href : '/blog/categorys/'},
          {name : 'TAGS', href : '/blog/tags/'},
          {name: 'ABOUT', href: '/about/'}
        ],


        articles: [],
        archives: archives,

      });
    });

  },


  article : function(req, res, next) {

    var title = req.params.title;

    Article.ArticleModel.findOne({title : title})
        .populate('author')
        .exec(function(err, article){

          console.log(err, article);

          //if(article == null){next(err)}

          var article = {
            title: article.title,
            create_date: article.getCreateDateString(),
            last_edit_date : article.getLastEditDateString(),
            content : article.content,
            author : article.author.name
          };

          Article.ArticleModel.aggregate().group({_id:"$archive", count:{$sum:1}}).exec(function(err, archives) {
            res.render('blog/article', {
              title: 'Mingz',
              titles: [
                //{name : 'HOME', href : '/'},
                {name: 'BLOG', href: '/blog/'},
                {name : 'ARCHIVES', href : '/blog/archives/'},
                {name : 'CATEGORYS', href : '/blog/categorys/'},
                {name : 'TAGS', href : '/blog/tags/'},
                {name: 'ABOUT', href: '/about/'}
              ],

              article: article,
              archives: archives,

            });
          });


    });

  },


  tags: function(req, res, next) {

    res.render('blog/tags', {
      title: 'Mingz',
      titles : [
        //{name : 'HOME', href : '/'},
        {name : 'BLOG', href : '/blog/'},
        {name : 'ARCHIVES', href : '/blog/archives/'},
        {name : 'CATEGORYS', href : '/blog/categorys/'},
        {name : 'TAGS', href : '/blog/tags/'},
        {name : 'ABOUT', href : '/about/'}
      ],



    });

  },

  categorys: function(req, res, next) {

    res.render('blog/categorys', {
      title: 'Mingz',
      titles : [
        //{name : 'HOME', href : '/'},
        {name : 'BLOG', href : '/blog/'},
        {name : 'ARCHIVES', href : '/blog/archives/'},
        {name : 'CATEGORYS', href : '/blog/categorys/'},
        {name : 'TAGS', href : '/blog/tags/'},
        {name : 'ABOUT', href : '/about/'}
      ],



    });

  },

  archives: function(req, res, next) {

    res.render('blog/archives', {
      title: 'Mingz',
      titles : [
        //{name : 'HOME', href : '/'},
        {name : 'BLOG', href : '/blog/'},
        {name : 'ARCHIVES', href : '/blog/archives/'},
        {name : 'CATEGORYS', href : '/blog/categorys/'},
        {name : 'TAGS', href : '/blog/tags/'},
        {name : 'ABOUT', href : '/about/'}
      ],



    });

  },


};


router.get('/article/:title', controller.article);
router.get('/author/:author', controller.author);

router.get('/archive/:year/:month', controller.archive);
router.get('/category/:category', controller.category);
router.get('/tag/:tag', controller.tag);

router.get('/archives/', controller.archives);
router.get('/categorys/', controller.categorys);
router.get('/tags/', controller.tags);
router.get('/', controller.index);

module.exports = router;
