import React, { Component } from 'react';
import Panel from './panel';
import NavBar from './navbar/navbar';
import Login from './login';
// import '../assets/css/login.css';
import '../assets/css/login.css';

import logo from '../assets/images/logo.png';

import { connect } from 'react-redux';
import { getDataObject } from '../actions';

import Tour from 'reactour';

const steps = [
    {
        selector: '.first-step',
        content: 'Welcome to FlexNotes!',
        style: {textAlign: "center"}
    },
    {
        selector: '.second-step',
        content: 'This is the navbar. You can organize your notes into binders, tabs and pages.',
        style: {textAlign: "center", marginTop: "30px"}
    },
    {
        selector: '.third-step',
        content: 'You can save class videos here. Just paste the url address and save. You can also search YouTube!',
        style: {textAlign: "center", marginTop: "30px"}
    },
    {
        selector: '.fourth-step',
        content: 'You can save class slides here. Just paste the url address and save.',
        style: {textAlign: "center"}
    },
    {
        selector: '.fifth-step',
        content: 'You can take notes here.',
        style: {textAlign: "center"}
    },
    {
        selector: '.sixth-step',
        content: 'You can style your notes with the toolbar. It also allows you to add links and images.',
        style: {textAlign: "center"}
    },
    {
        selector: '.seventh-step',
        content: 'Happy note-taking!',
        style: {textAlign: "center"}
    }
];


class Dashboard extends Component {
    constructor(props){
        super(props);

        this.state = {
            isTourOpen: false
        }
    }

    closeTour = () => {
        this.setState({ isTourOpen: false });
    };

    openTour = () => {
        this.setState({ isTourOpen: true });
    };

    componentWillMount(){
        this.props.getDataObject();
    }

    render(){
        console.log('dashboard props', this.props);
        if(!this.props.binderArr){
            return null;
        } 
        return(

            <div id="dashboard-container" className="row">
                <div className="logout">
                    <img className="logoImage" src={logo} />
                    <Login />
                    <button className="startTour" onClick={this.openTour}>Tour</button>
                </div>

                <NavBar />
                <Panel />

                <Tour
                    steps={steps}
                    isOpen={this.state.isTourOpen}
                    onRequestClose={this.closeTour}
                />
            </div>
        );
           // }
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
