/**
 * Author: zhaojm
 * Email: <mingzz2013@gmail.com>
 * Create Time: 15/6/22
 */
var express = require('express'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var tagSchema = new Schema({
    name : String,
    create_date : Date,
    last_edit_date : Date,
});


tagSchema.methods.getCreateDateString = function(){
    return this.create_date.getFullYear() + "-" + (this.create_date.getMonth() + 1) + "-" + this.create_date.getDate();
};
tagSchema.methods.getLastEditDateString = function(){
    return this.last_edit_date.getFullYear() + "-" + (this.last_edit_date.getMonth() + 1) + "-" + this.last_edit_date.getDate();
};

var TagModel = mongoose.model('Tag', tagSchema);

module.exports = {
    tagSchema : tagSchema,
    TagModel : TagModel,
};
