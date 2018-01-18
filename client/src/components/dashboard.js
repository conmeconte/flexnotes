import React, { Component } from 'react';
import Panel from './panel';
import NavBar from './navbar/navbar';
import Login from './login';
import '../assets/css/login.css';

import { connect } from 'react-redux';
import { getDataObject } from '../actions';


class Dashboard extends Component {
    // componentWillMount(){
    //     this.props.getDataObject();
    // }

    render(){
        console.log('dashboard props', this.props);
        if(!this.props.binderArr){
            return null;
        } 
        return(
            <div>
                <div className="logout">
                    <Login />
                </div>
                <NavBar />
                <Panel />
            </div>
        );
           // }
    }
}

function mapStateToProps(state){
    //console.log('mstp dashboard:', state);
    return{
        //data: state.auth,
        binderArr: state.binderArray.binderArr,
        //initBinder: state.binder.binderObj,
        interface: state.interface
    }
}

export default connect(mapStateToProps, { getDataObject })(Dashboard);
