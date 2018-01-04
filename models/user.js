const mongoose = require('mongoose');
const {Schema} = mongoose; //ES6 destructuring

const userSchema = new Schema({
    googleId: String, 
    userName: String,
    binder_obj : {
        01 : {
            binder_color : String,
            binder_id : Number,
            binder_name : String,
            binder_url : String,
            tab_obj : {
            01 : {
                page_obj : {
                01 : {
                    calendar : {
                    cal_url : String
                    },
                    lecture_slides : {
                    lec_lastPage : String,
                    lec_size : String,
                    lec_url : String
                    },
                    notes : {
                    notes_size : String,
                    notes_url : String
                    },
                    page_color : String,
                    page_date : Date,
                    page_id : String,
                    page_name : String,
                    page_url : String,
                    video : {
                    vid_size : String,
                    vid_url : String
                    }
                }
                },
                tab_color : String,
                tab_id : String,
                tab_name : String,
                tab_url : String
            }
            }
        }
    }
        
    
});

mongoose.model('users', userSchema);



  
  
  