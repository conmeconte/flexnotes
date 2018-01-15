import React, { Component } from 'react';
import Panel from './panel';
import NavBar from './navbar/navbar';
import Login from './login';
import '../assets/css/login.css';

import { connect } from 'react-redux';
//import { getDataObject, binderArray, selectBinder, binderUpdate, tabUpdate, pageUpdate } from '../actions';


class Dashboard extends Component {

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
    //console.log('mstp dashboard:', state);
    return{
        binderArr: state.binderArray.binderArr,
        initBinder: state.binder.binderObj,
        interface: state.interface
    }
}

export default connect(mapStateToProps, null)(Dashboard);
