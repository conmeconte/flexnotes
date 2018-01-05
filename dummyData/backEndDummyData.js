

let fakeData= 
{   
    googleId: String, 
    userName: String,
    binder_arr_obj : [
        {
            binder_id: 1,
            binder_name: 'Binder1',
            binder_color: 'red',
            binder_url: '/binder1',
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
                        vid_url : "https://www.youtube.com/watch?v=Ukg_U3CnJWI",
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