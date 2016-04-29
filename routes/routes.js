/**
 * Author: zhaojm
 * Email: <mingzz2013@gmail.com>
 * Create Time: 15/6/19
 */


var controller = require('../controllers/controller');


module.exports = function(app){
    controller.registerRoutes(app);
};