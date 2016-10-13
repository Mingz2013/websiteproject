/**
 * Author: zhaojm
 * Email: <mingzz2013@gmail.com>
 * Create Time: 15/8/21
 */

var express = require('express'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema
ObjectId = Schema.ObjectId;



var aboutSchema = new Schema({

    //title : {type : String, default : 'Untitled', index : true},
    content : {type : String, default : '', index : true},
    author : {type : ObjectId, ref : 'User'},
    create_date : Date,
    last_edit_date : Date,

    //comments : [comment.commentSchema],

});

aboutSchema.methods.getCreateDateString = function(){
    return this.create_date.getFullYear() + "-" + (this.create_date.getMonth() + 1) + "-" + this.create_date.getDate();
};
aboutSchema.methods.getLastEditDateString = function(){
    return this.last_edit_date.getFullYear() + "-" + (this.last_edit_date.getMonth() + 1) + "-" + this.last_edit_date.getDate();
};



var AboutModel = mongoose.model('About', aboutSchema);

module.exports = {
    aboutSchema : aboutSchema,
    AboutModel : AboutModel,
};

