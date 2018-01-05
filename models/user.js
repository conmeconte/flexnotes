const mongoose = require('mongoose');
const {Schema} = mongoose; //ES6 destructuring

// const userSchema = new Schema({
//     googleId: String, 
//     userName: String
    
        
    
// });
const userSchema = new Schema({
    googleId: String, 
    userName: String,
    binder_arr_obj : [
        {binder_id: { type:String, default:"B-01"},
        binder_name: { type:String, default:"FlexNotes!"}, 
        binder_color : String,
        binder_url : String,
        tab_arr_obj:[
            {
            tab_name : { type:String, default:"This is a tab"},   
            tab_color : String,
            tab_id : { type:String, default:"T-01"},
            tab_url : String,
            page_arr_obj :[ 
                {
                    page_color : String,
                    page_date : {type: Date, default: Date.now},
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
                          nodes: [
                            {
                              kind: String,
                              type: String,
                              nodes: [
                                {
                                  kind: String,
                                  leaves: [
                                    {
                                      text: String
                                    },
                                    {
                                      text: String,
                                      marks: [
                                        {
                                          type: String
                                        }
                                      ]
                                    },
                                    {
                                      text: String
                                    },
                                    {
                                      text: String,
                                      mark: [
                                        {
                                          type: String
                                        }
                                      ]
                                    },
                                    {
                                      text: String
                                    },
                                    {
                                      text: String,
                                      mark: [
                                        {
                                          type: String
                                        }
                                      ]
                                    },
                                    {
                                      text: String
                                    }
                                  ]
                                }
                              ]
                            },
                            {
                              kind:String,
                              type: String,
                              nodes: [
                                {
                                  kind: String,
                                  leaves: [
                                    {
                                      text: String
                                    },
                                    {
                                      text: String,
                                      marks: [
                                        {
                                          type: String
                                        }
                                      ]
                                    },{
                                      text: String
                                    }
                                  ]
                                }
                              ]
                            },
                            {
                              kind: String,
                              type: String,
                              nodes: [
                                {
                                  kind: String,
                                  leaves: [
                                    {
                                      text: String
                                    }
                                  ]
                                }
                              ]
                            },
                            {
                              kind: String,
                              type: String,
                              nodes: [
                                {
                                  kind: String,
                                  leaves: [
                                    {
                                      text: String
                                    }
                                  ]
                                }
                              ]
                            }
                          ]
                        }
                      },

                    video :[ 
                        {
                        vid_url : String,
                        videoInfo: String
                        }
                    ],
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
                }
            ]
            }
        ],
        }
    ]
        
});

mongoose.model('users', userSchema);



  
  
  