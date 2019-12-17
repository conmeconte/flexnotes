const mongoose = require('mongoose');
const { Schema } = mongoose;
const tabSchemaNew = require('./Tabs');


/* Binder Schema */

const binderSchemaNew = new Schema({
    binder_count: { type:Number, default:1},
    binder_name: { type:String, default:"New Binder"}, 
    binder_color : String,
    tab_arr_obj:[tabSchemaNew]
});

module.exports = binderSchemaNew;