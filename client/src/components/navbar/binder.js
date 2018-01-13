import React, { Component } from 'react';
import { Link, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { binderArray, selectBinder, binderUpdate } from '../../actions';


import Tab from './tab';

import '../../assets/css/navbar.css';

class Binder extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fake_data:  {
              "_id": {
                  "$oid": "5a57bd348b53621f100237eb"
              },
              "binder_arr_obj": [
                  {
                      "binder_count": 1,
                      "binder_name": "FlexNotes!",
                      "tab_arr_obj": [
                          {
                              "tab_name": "This is a tab",
                              "tab_count": 1,
                              "page_arr_obj": [
                                  {
                                      "page_date": {
                                          "$date": "2018-01-11T19:38:28.391Z"
                                      },
                                      "page_count": 1,
                                      "page_name": "Introduction to FlexNotes",
                                      "notes": {
                                          "document": {
                                              "nodes": [
                                                  {
                                                      "kind": "block",
                                                      "type": "paragraph",
                                                      "nodes": [],
                                                      "_id": {
                                                          "$oid": "5a57bd348b53621f100237ea"
                                                      }
                                                  }
                                              ]
                                          }
                                      },
                                      "video": [
                                          {
                                              "_id": {
                                                  "$oid": "5a57bd348b53621f100237e9"
                                              },
                                              "videoInfo": "No Info"
                                          }
                                      ],
                                      "_id": {
                                          "$oid": "5a57bd348b53621f100237e8"
                                      },
                                      "page_color": "orange"
                                  }
                              ],
                              "_id": {
                                  "$oid": "5a57bd348b53621f100237e7"
                              }
                          }
                      ],
                      "_id": {
                          "$oid": "5a57bd348b53621f100237e6"
                      }
                  }
              ],
              "googleId": "103970352561814947806",
              "userName": "JOhn Hong",
              "__v": 0
          },

            binder_color_arr: [
                '#000080', '#808000', '#800000', '#a0522d', '#8a2be2'
            ],
            editable: false,
            active: false,
            new_tab_arr: [{
                tab_id: 1,
                tab_color: 'blue',
                tab_name: 'TabName',
                tab_url: '/tab1',
                page_arr_obj: [{

                    page_id: 1,
                    page_color: 'white',
                    page_name: 'PageName',
                    page_date: '',
                    page_url: '/page1'
                }]
            }]

        }

        this.addBinder = this.addBinder.bind(this);
        this.deleteBinder = this.deleteBinder.bind(this);
        this.editable = this.editable.bind(this);
        this.notEditable = this.notEditable.bind(this);
        this.binderLinkActive = this.binderLinkActive.bind(this);
        this.binderLinkNotActive = this.binderLinkNotActive.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount(){

        //console.log("Fake Data: ", this.state.fake_data.binder_arr_obj);
        //this.props.binderArray(this.state.fake_data.binder_arr_obj);
        this.props.selectBinder(this.props.binderArr[0]);
    }

    addBinder() {
        console.log('add Binder');
        const { binder_arr_obj, new_tab_arr, binder_color_arr } = this.state;

        //let binder_color_array = ['#000080', '#808000', '#800000', '#a0522d', '#8a2be2'];

        let length = binder_arr_obj.length;
        if (length === 0) {
            //new binder when there are no binders
            let new_binder_obj =                  
            {
                _id: { $oid: 'someRandomNumberMongoDBAssings' },
                binder_id: 1,
                binder_name: 'Binder1',
                binder_color: 'red',
                tab_arr_obj: [
                  {
                    tab_id: 1,
                    tab_color: 'blue',
                    tab_name: 'Tab1',
                    tab_url: '/tab1',
                    page_arr_obj: [
                      {
                        page_id: 1,
                        page_color: 'white',
                        page_name: 'Page1',
                        page_date: '',
                        page_url: '/page1',
                        calendar: {
                          cal_url: String
                        },
                        lecture_slides: {
                          lec_id: 'https://docs.google.com/presentation/d/1kRrOFawfxsEOPd4PlXlceQq2L355XA6pcYWRcq5v4xE/embed'
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
                                      }, {
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

            this.setState({
                binder_arr_obj: [new_binder_obj]
            });

        } else {
            let new_index = binder_arr_obj[length - 1].binder_id + 1;
            let new_url = '/binder' + new_index;

            let index_mod = new_index % 5;
            //console.log('index_mod', index_mod);

            let new_binder_obj = {
                binder_id: new_index,
                binder_name: 'New Binder',
                binder_color: binder_color_arr[index_mod],
                binder_url: new_url,
                tab_arr_obj: new_tab_arr
            }

            this.setState({
                binder_arr_obj: [...binder_arr_obj, new_binder_obj]
            });

        }

    }

    deleteBinder(delete_id) {
        console.log('delete button clicked, binder_id: ', delete_id);

        const { binder_arr_obj } = this.state;
        console.log(binder_arr_obj);
        let deleteIndex = 0;
        for (deleteIndex; deleteIndex < binder_arr_obj.length; deleteIndex++) {
            if (binder_arr_obj[deleteIndex].binder_id === delete_id) {
                binder_arr_obj.splice(deleteIndex, 1);
            }
        }

        this.setState({
            binder_arr_obj: binder_arr_obj
        });
    }

    editable() {
        console.log("editable should be true");
        this.setState({
            editable: true
        });
    }

    notEditable() {
        console.log("editable should be false");
        this.setState({
            editable: false
        });
    }

    // keyPressed(event) {
    //     if(event.key == 'Enter') {
    //       //this.notEditable();
    //   }
    // }

    textChanged(e, id) {
        const { binder_arr_obj } = this.state;
        //console.log("text changed, id:", id);
        //console.log(e.target.value);

        for (let i = 0; i < binder_arr_obj.length; i++) {
            if (binder_arr_obj[i].binder_id === id) {
                //console.log('binder_id and id match');
                binder_arr_obj[i].binder_name = e.target.value;
            }
        }
        this.setState({
            binder_arr_obj: binder_arr_obj
        });
    }

    binderLinkActive(){
        //console.log('binderlinkactive color:', color);
        // this.setState({
        //     active: true
        // });
    }

    binderLinkNotActive(){
        //console.log('binderlinkactive color:', color);
        // this.setState({
        //     active: false
        // });
    }

    handleClick(binder_id){
        //this.props.selectBinder(binderObj);
        //this.props.binderUpdate(binder_id);
        //console.log("binderObj", binderObj);
    }
    /*
    
    
    
    
    //keep data updated with database.




    */
    render() {
        const { editable, active } = this.state;
        //console.log("Binder props:", this.props);
        //console.log('Render binderArray:', binder_array);
        let binder_link = [];
        //map binders
        if (editable) {
            binder_link = this.props.binderArr.map((item, index) => {
                //console.log('editable map:', item);
                return (
                    <li key={index}>
                        <input
                            className="edit_input"
                            ref='textInput'
                            type='text'
                            onChange={(e) => this.textChanged(e, item.binder_count)}
                            // onBlur={this.notEditable}
                            // onKeyPress={this.keyPressed}
                            value={item.binder_name}
                        />

                        <button type="button" className="btn btn-default btn_delete" onClick={() => this.deleteBinder(item.binder_id)} >
                            <span className="glyphicon glyphicon-minus"></span>
                        </button>
                    </li>
                );
            });

        } else {
            binder_link = this.props.binderArr.map((item, index) => {

                //console.log('Binder map:', item);
                var binderStyle = {
                    backgroundColor: item.binder_color
                }

                var binderStyle2 = {
                    backgroundColor: 'inherit'
                }

                let binder_url = '/' + item._id.$oid;
                //console.log('binder id: ', item._id.$oid);
                return (
                    <li key={index}>
                        <Link to={'/main' + binder_url} style={{ textDecoration: 'none' }} >
                            <div className="binderDiv" onClick={this.handleClick(item._id.$oid)} style={active ? binderStyle : binderStyle2} onMouseEnter={this.binderLinkActive} onMouseLeave={this.binderLinkNotActive}>
                                {item.binder_name}
                            </div>
                        </Link>
                    </li>
                );
            });
        }

        const binder_route = this.props.binderArr.map((item, index) => {
            let binder_url = '/' + item._id.$oid;
            //console.log('Route binder id: ', binder_url);
            //console.log("binder_url", binder_url);
            return (
                <Route key={index} path={'/main'+ binder_url } render={() =>
                    <Tab binder_url={binder_url} />}
                />
            );
        });

        return (
            <div className="nav_binder">

                <button type="button" className={`btn btn-default btn-xs btn_edit_binder ${editable ? 'hidden' : 'visible'}`} onClick={this.editable}>
                    Binders <span className="glyphicon glyphicon-pencil"></span>
                </button>
                <button type="button" className={`btn btn-default btn-xs btn_edit_binder ${editable ? 'visible' : 'hidden'}`} onClick={this.notEditable}>
                    Binders <span className="glyphicon glyphicon-ok"></span>
                </button>



                <ul className="binder_wrap">
                    {binder_link}
                </ul>
                {binder_route}



                <button className={`btn btn-default btn-xs btn_add ${editable ? 'visible' : 'hidden'}`} onClick={this.addBinder}>
                    <span className="glyphicon glyphicon-plus"></span>
                </button>
            </div>
        );
    }
}
    function mapStateToProps(state){
        //console.log('binder mstp', state);
        return{
            binderArr: state.binderArray.binderArr
        }
    }

    export default withRouter(connect(mapStateToProps,{ binderArray, selectBinder, binderUpdate })(Binder));


