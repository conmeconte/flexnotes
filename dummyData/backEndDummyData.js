

let fakeData= 
{   _id:{$oid: 'someRandomNumberMongoDBAssings'},
    googleId: 103970352561814947806, 
    userName: 'JOhn Hong',
    binder_arr_obj : [
        {   
            _id:{$oid: 'someRandomNumberMongoDBAssings'},
            binder_id: 1,
            binder_name: 'Binder1',
            binder_color: 'red',
            tab_arr_obj:[
              {
                tab_id: 1,
                tab_color: 'blue',
                tab_name: 'Tab1',
                tab_url: '/tab1',
                page_arr_obj :[ 
                  {
                    page_id: 1,
                    page_color: 'white',
                    page_name: 'Page1',
                    page_date: '',
                    page_url: '/page1',
                    calendar : {
                        cal_url : String
                    },
                    lecture_slides : {
                       lec_id : '1kRrOFawfxsEOPd4PlXlceQq2L355XA6pcYWRcq5v4xE'
                    },
                    notes: {
                      document: {
                        nodes: [
                          {
                            kind: "block",
                            type: "paragraph",
                            nodes: [
                              {
                                kind: "text",
                                leaves: [
                                  {
                                    text: "This is editable "
                                  },
                                  {
                                    text: "rich",
                                    marks: [
                                      {
                                        type: "bold"
                                      }
                                    ]
                                  },
                                  {
                                    text: " text, "
                                  },
                                  {
                                    text: "much",
                                    marks: [
                                      {
                                        type: "italic"
                                      }
                                    ]
                                  },
                                  {
                                    text: " better than a "
                                  },
                                  {
                                    text: "<textarea>",
                                    marks: [
                                      {
                                        type: "code"
                                      }
                                    ]
                                  },
                                  {
                                    text: "!"
                                  }
                                ]
                              }
                            ]
                          },
                          {
                            kind: "block",
                            type: "paragraph",
                            nodes: [
                              {
                                kind: "text",
                                leaves: [
                                  {
                                    text: "Since it's rich text, you can do things like turn a selection of text "
                                  },
                                  {
                                    text: "bold",
                                    marks: [
                                      {
                                        type: "bold"
                                      }
                                    ]
                                  },{
                                    text: ", or add a semantically rendered block quote in the middle of the page, like this:"
                                  }
                                ]
                              }
                            ]
                          },
                          {
                            kind: "block",
                            type: "block-quote",
                            nodes: [
                              {
                                kind: "text",
                                leaves: [
                                  {
                                    text: "A wise quote."
                                  }
                                ]
                              }
                            ]
                          },
                          {
                            kind: "block",
                            type: "paragraph",
                            nodes: [
                              {
                                kind: "text",
                                leaves: [
                                  {
                                    text: "Try it out for yourself!"
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
                        _id:{$oid: 'someRandomNumberMongoDBAssings'},
                        videoInfo : "No Info",
                        videoId: "Ukg_U3CnJWI"
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
}

module.exports= JSON.stringify(fakeData);