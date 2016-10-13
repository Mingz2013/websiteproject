/**
 * Author: zhaojm
 * Email: <mingzz2013@gmail.com>
 * Create Time: 15/6/22
 */
var express = require('express'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var commentSchema = new Schema({
    title : String,
    content : String,
    create_date : Date,
    last_edit_date : Date,
});


commentSchema.methods.getCreateDateString = function(){
    return this.create_date.getFullYear() + "-" + (this.create_date.getMonth() + 1) + "-" + this.create_date.getDate();
};
commentSchema.methods.getLastEditDateString = function(){
    return this.last_edit_date.getFullYear() + "-" + (this.last_edit_date.getMonth() + 1) + "-" + this.last_edit_date.getDate();
};

var CommentModel = mongoose.model('Comment', commentSchema);

module.exports = {
    commentSchema : commentSchema,
    CommentModel : CommentModel,
};