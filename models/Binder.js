const mongoose = require('mongoose');
const { Schema } = mongoose;
const tabSchemaNew = require('./Tabs');


/* Binder Schema */

const binderSchemaNew = new Schema({
    binder_id: { type:String, default:"B-01"},
    binder_name: { type:String, default:"FlexNotes!"}, 
    binder_color : String,
    tab_arr_obj:[tabSchemaNew]
});

module.exports = binderSchemaNew;