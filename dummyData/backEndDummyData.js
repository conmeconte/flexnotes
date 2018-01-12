
let fakeData =
  {
    _id: { $oid: 'someRandomNumberMongoDBAssings' },
    googleId: 103970352561814947806,
    userName: 'JOhn Hong',
    binder_arr_obj: [
      {
        _id: { $oid: 'someRandomNumberMongoDBAssings' },
        binder_count: 1,
        binder_name: 'Binder1',
        binder_color: 'red',
        tab_arr_obj: [
          {
            _id: { $oid: 'someRandomNumberMongoDBAssings' },
            tab_count:1,
            tab_color: 'blue',
            tab_name: 'Tab1',
            page_arr_obj: [
              {
              page_arr_obj :[ 
                {
                  page_count: 1,
                  page_color: 'white',
                  page_name: 'Page1',
                  page_date: '',
                  calendar : {
                      cal_url : String
                  },
                  lecture_slides : {
                     lec_id : ''
                  },
                  notes: {
                    document: {
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
                          ]
                        }
                      ] 
                  }
                },
                video: [
                  {
                    _id: { $oid: 'someRandomNumberMongoDBAssings' },
                    videoInfo: "No Info",
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

module.exports = JSON.stringify(fakeData);