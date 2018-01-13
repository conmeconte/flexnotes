import React, { Component } from 'react';
import Panel from './panel';
import NavBar from './navbar/navbar';
import Login from './login';
import '../assets/css/login.css';

import { connect } from 'react-redux';
import { binderArray, selectBinder, binderUpdate, tabUpdate, pageUpdate } from '../actions';


class Dashboard extends Component {
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
          }
        }
    }

    componentDidMount() {

        console.log("dashboard did mount");
        this.props.binderArray(this.state.fake_data.binder_arr_obj);
        this.props.selectBinder(this.state.fake_data.binder_arr_obj[0]);
        
        this.props.binderUpdate(this.state.fake_data.binder_arr_obj[0]._id.$oid);
        this.props.tabUpdate(this.state.fake_data.binder_arr_obj[0].tab_arr_obj[0]._id.$oid);
        this.props.pageUpdate(this.state.fake_data.binder_arr_obj[0].tab_arr_obj[0].page_arr_obj[0]._id.$oid);
    }

    render(){
        console.log('dashboard props', this.props);
        

        return(
            <div>
                <div className="logout">
                    <Login />
                </div>
                <NavBar />
                <Panel />
            </div>
        );
    }
}

function mapStateToProps(state){
    
    return{
        binderArr: state.binderArray.binderArr,
        initBinder: state.binder.binderObj,
        interface: state.interface
    }
}

export default connect(mapStateToProps,{ binderArray, selectBinder, binderUpdate, tabUpdate, pageUpdate })(Dashboard);
