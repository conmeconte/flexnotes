const mongoose = require('mongoose');
const { Schema } = mongoose;

/* tab Schema */

const tabSchemaNew = new Schema({
    tab_name : { type:String, default:"This is a tab"},   
    tab_color : String,
    tab_id : { type:String, default:"T-01"},
    tab_url : String,
    page_arr_obj :[ 
        
    ]
});

module.exports = tabSchemaNew;