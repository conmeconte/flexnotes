const mongoose = require('mongoose');
const { Schema } = mongoose;
const pageSchemaNew = require('./Page');


/* tab Schema */

const tabSchemaNew = new Schema({
    tab_name : { type:String, default:"New Tab"},   
    tab_color : String,
    tab_count : { type:Number, default:1},
    page_arr_obj :[pageSchemaNew]
});

module.exports = tabSchemaNew;