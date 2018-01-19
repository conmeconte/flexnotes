const mongoose = require('mongoose');
const { Schema } = mongoose;
const notesNode = require('./NotesNode');
const videoSchemaNew = require('./Video');

/* Page Schema */

const pageSchemaNew = new Schema({
    page_color : String,
    page_date : {type: Date, default:Date.now},
    page_count : { type:Number, default:1},
    page_name : { type:String, default:"untitled"},
    calendar : {
        cal_url : String
    },
    lecture_slides : {
        lec_id : String
    },
    notes : {
        document: {}
      },
  
    video :[videoSchemaNew],
    panel_dimensions: {
<<<<<<< HEAD
        lecture_Panel: {
            top_left_panel_height: Number,
            top_left_panel_width: Number,
            top_right_panel_height: Number,
            number_of_panels: Number
        },
        video_Panel: {
            width: String,
            height: String
        },
        note_Panel: {
            width: String,
            height: String
        },
        meister_Panel: {
            width: String,
            height: String
        }
=======
        top_left_panel_height: Number,
        top_left_panel_width: Number,
        top_right_panel_height: Number,
        number_of_panels: Number
>>>>>>> f3cbcbe80d8fedd7b051c08691ae17f38af33246
    }
},{minimize: false});

module.exports = pageSchemaNew;