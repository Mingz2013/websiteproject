/**
 * Author: zhaojm
 * Email: <mingzz2013@gmail.com>
 * Create Time: 15/6/20
 */
var express = require('express'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var userSchema = new Schema({
    name : {type : String, unique : true},
    email : {type : String, unigue : true},
    password : {type : String, index : true},
    create_date : Date,
    last_edit_date : Date,
});

userSchema.methods.getCreateDateString = function(){
    return this.create_date.getFullYear() + "-" + (this.create_date.getMonth() + 1) + "-" + this.create_date.getDate();
};
userSchema.methods.getLastEditDateString = function(){
    return this.last_edit_date.getFullYear() + "-" + (this.last_edit_date.getMonth() + 1) + "-" + this.last_edit_date.getDate();
};



var UserModel = mongoose.model('User', userSchema);



module.exports = {
    userSchema : userSchema,
    UserModel : UserModel,
};