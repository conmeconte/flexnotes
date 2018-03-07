const mongoose = require('mongoose');
const { Schema } = mongoose;
const binderSchemaNew = require('./Binder');


/* User Schema */


const userSchemaNew = new Schema({
    googleId: String, 
    userName: String,
    binder_arr_obj : [binderSchemaNew],
    password: String
});

module.exports = userSchemaNew;


