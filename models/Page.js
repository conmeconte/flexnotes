const mongoose = require('mongoose');
const { Schema } = mongoose;

/* Page Schema */

const pageSchemaNew = new Schema({
    page_color : String,
    page_date : {type: Date, default:Date.now},
    page_id : { type:String, default:"P-01"},
    page_name : { type:String, default:"Introduction to FlexNotes"},
    page_url : String,
    calendar : {
        cal_url : String
    },
    lecture_slides : {
        lec_id : String
    },
    notes : {
        document: {
          nodes: []
        }
      },
  
    video :[],
    panel_dimensions: {
        lecture_Panel: {
            width: String,
            height: String
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
    }
});

module.exports = pageSchemaNew;