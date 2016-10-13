/**
 * Author: zhaojm
 * Email: <mingzz2013@gmail.com>
 * Create Time: 15/6/19
 */

var home = require('./home/index');
var admin = require('./admin/index');
var blog = require('./blog/index');
var games = require('./games/index');
var auth = require('./auth/index');
var about = require('./home/about');

module.exports = {
    registerRoutes : function(app){

        app.use('/admin', admin);
        app.use('/blog', blog);
        app.use('/games', games);
        app.use('/auth', auth);
        app.use('/about', about);
        app.use('/', home);
    },

};