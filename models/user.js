const mongoose = require('mongoose');
const {Schema} = mongoose; //ES6 destructuring


/* User Schema */
const userSchema = new Schema({
    googleId: String, 
    userName: String,
    binder_arr_obj : []
        
});

mongoose.model('users', userSchema);

/* Binder Schema */

const binderSchemaNew = new Schema({
  binder_id: { type:String, default:"B-01"},
  binder_name: { type:String, default:"FlexNotes!"}, 
  binder_color : String,
  binder_url : String,
  tab_arr_obj:[
      
  ]
})
mongoose.model('binders', binderSchemaNew);

/* tab Schema */

const tabSchemaNew = new Schema({
  tab_name : { type:String, default:"This is a tab"},   
  tab_color : String,
  tab_id : { type:String, default:"T-01"},
  tab_url : String,
  page_arr_obj :[ 
      
  ]
})
mongoose.model('tabs', tabSchemaNew);

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
})

mongoose.model('datapages', pageSchemaNew);

  
const videoSchema = new Schema(
  {
  vid_url : String,
  videoInfo: String
  }
) ;

mongoose.model('datavideos', videoSchema);


const notesNode_arr= new Schema(
  {
    kind: {type: String, default: "block"},
    type: {type: String, default: "paragraph"},
    nodes: [
        {
            kind: {type: String, default: "text"},
            leaves: [
                {
                    text: {type: String, default: "A line of text in a paragraph."}
                }
            ]
        }
    ]
}

);

mongoose.model('notesNodeArr', notesNode_arr);


