/**
 * Author: zhaojm
 * Email: <mingzz2013@gmail.com>
 * Create Time: 15/6/19
 */
var mongoose = require('mongoose');
var config = require('../config');

var opts = {
    server : {
        socketOptions : { keepAlive : 1 }
    }
};

module.exports = function(app){

    switch (app.get('env')){
        case 'development' :
            mongoose.connect(config.mongo.development.connectionString, opts);
            break;
        case 'production' :
            mongoose.connect(config.mongo.production.connectionString, opts);
            break;
        default :
            throw new Error('Unknown execution environment: ' + app.get('env'));
    }

};

