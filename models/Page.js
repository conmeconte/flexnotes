const mongoose = require('mongoose');
const { Schema } = mongoose;
const notesNode = require('./NotesNode');
const videoSchemaNew = require('./Video');

/* Page Schema */

const pageSchemaNew = new Schema({
    page_color : String,
    page_date : {type: Date, default:Date.now},
    page_count : { type:Number, default:1},
    page_name : { type:String, default:"Introduction to FlexNotes"},
    calendar : {
        cal_url : String
    },
    lecture_slides : {
        lec_id : String
    },
    notes : {
        document: {
          nodes: [notesNode]
        }
      },
  
    video :[videoSchemaNew],
    panel_dimensions: {
        top_left_panel_height: Number,
        top_left_panel_width: Number,
        top_right_panel_height: Number,
        number_of_panels: Number
    }
});

module.exports = pageSchemaNew;