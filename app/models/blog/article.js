/**
 * Author: zhaojm
 * Email: <mingzz2013@gmail.com>
 * Create Time: 15/6/19
 */
var express = require('express'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema
    ObjectId = Schema.ObjectId;

//var Category = require('./category');
//    tag = require('./tag'),
//    comment = require('./comment');




var articleSchema = new Schema({

    title : {type : String, default : 'Untitled', index : true},
    content : String,
    author : {type : ObjectId, ref : 'User'},
    create_date : Date,
    last_edit_date : Date,
    archive : {
        str : String,
        year : Number,
        month : Number,
    },
    category : String,

    //tags : [tag.tagSchema],
    //category : {type : ObjectId, ref : 'Category'},
    //comments : [comment.commentSchema],

});

articleSchema.methods.getCreateDateString = function(){
    return this.create_date.getFullYear() + "-" + (this.create_date.getMonth() + 1) + "-" + this.create_date.getDate();
};
articleSchema.methods.getLastEditDateString = function(){
    return this.last_edit_date.getFullYear() + "-" + (this.last_edit_date.getMonth() + 1) + "-" + this.last_edit_date.getDate();
};
//articleSchema.methods.getArchive = function(){
//    return this.create_date.getFullYear() + "." + (this.create_date.getMonth() + 1);
//};


var ArticleModel = mongoose.model('Article', articleSchema);

module.exports = {
    articleSchema : articleSchema,
    ArticleModel : ArticleModel,
};

