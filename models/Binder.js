const mongoose = require('mongoose');
const { Schema } = mongoose;

/* Binder Schema */

const binderSchemaNew = new Schema({
    binder_id: { type:String, default:"B-01"},
    binder_name: { type:String, default:"FlexNotes!"}, 
    binder_color : String,
    tab_arr_obj:[
        
    ]
});

module.exports = binderSchemaNew;