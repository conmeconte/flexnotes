const mongoose= require('mongoose');
const {Schema} = mongoose;

const tabSchema = new Schema({
    tab_name = String,     
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
                                lec_size : String,
                                lec_id : String
                            },
                            notes : {
                                notes_size : String,
                                notes_url : String
                            },
                            page_color : String,
                            page_date : {type: Date, default: Date.now},
                            page_id : String,
                            page_name : String,
                            page_url : String,
                            video : {
                                vid_url : String,
                                videoInfo: String
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

})


module.exports = tabSchema;