import React, { Component } from 'react';
import Panel from './panel';
import NavBar from './navbar/navbar';
import Login from './login';

import { connect } from 'react-redux';
import { getDataObject } from '../actions';

import Tour from 'reactour';
import steps from './react_tour_steps';

import '../assets/css/dashboard.css';

class Dashboard extends Component {
    componentWillMount(){
        this.props.getDataObject();

        this.state = {
            isTourOpen: false
        };

        this.toggleTour = this.toggleTour.bind(this);
    }

    toggleTour() {
        if (this.state.isTourOpen) {
            this.setState({
                isTourOpen: false
            });
        } else {
            this.setState({
                isTourOpen: true
            });
        }
    }

    render(){
        // console.log('dashboard props', this.props);
        if(!this.props.binderArr){
            return null;
        } 
        return(

            <div id="dashboard-container" className="row">
                <NavBar toggleTour={this.toggleTour}/>
                <Panel />
                <Tour
                    steps={steps}
                    isOpen={this.state.isTourOpen}
                    onRequestClose={this.toggleTour}
                />
            </div>
        );
    }
}

function mapStateToProps(state){
    //console.log('mstp dashboard:', state);
    return{
        //data: state.auth,
        binderArr: state.binderArray.binderArr
        //initBinder: state.binder.binderObj,
        //interface: state.interface
    }
}

export default connect(mapStateToProps, { getDataObject })(Dashboard);
