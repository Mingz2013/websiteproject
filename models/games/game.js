/**
 * Author: zhaojm
 * Email: <mingzz2013@gmail.com>
 * Create Time: 15/6/19
 */
var express = require('express'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var gameSchema = new Schema({
    title : String,
    description : String,
    url : String,
    author : {type : ObjectId, ref : 'User'},
    create_date : Date,
    last_edit_date : Date,
});

gameSchema.methods.getCreateDateString = function(){
    return this.create_date.getFullYear() + "-" + (this.create_date.getMonth() + 1) + "-" + this.create_date.getDate();
};
gameSchema.methods.getLastEditDateString = function(){
    return this.last_edit_date.getFullYear() + "-" + (this.last_edit_date.getMonth() + 1) + "-" + this.last_edit_date.getDate();
};

var Game = mongoose.model('Game', gameSchema);

module.exports = Game;
