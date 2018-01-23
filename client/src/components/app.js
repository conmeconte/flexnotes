import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from "../actions";
import LandingPage from './landingpage';
import Dashboard from './dashboard';
import 'materialize-css/dist/css/materialize.min.css';
import '../assets/css/landing-page.css';
import '../assets/css/login.css';
import '../assets/css/modal.css';
import '../assets/css/navbar.css';
import '../assets/css/notes.css';
import '../assets/css/panel.css';
import '../assets/css/slides.css';
import '../assets/css/video-add-modal.css';
import '../assets/css/video.css';


import Tour from 'reactour';

//import { getDataObject } from './../actions/index';

// import 'materialize-css/dist/css/materialize.min.css';
// import { getDataObject } from './../actions/index';

const styles={
    // background: "black",
    // color: "white"
    textAlign: "center"
};

const steps = [
    {
        selector: '.first-step',
        content: 'Welcome to FlexNotes!',
        style: styles
    },
    {
        selector: '.second-step',
        content: 'This is the navbar. You can organize your notes into binders, tabs and pages.',
        style: styles
    },
    {
        selector: '.third-step',
        content: 'You can save class videos here. Just paste the url address and save. You can also search YouTube!',
        style: styles
    },
    {
        selector: '.fourth-step',
        content: 'You can save class slides here. Just paste the url address and save.',
        style: styles
    },
    {
        selector: '.fifth-step',
        content: 'You can take notes here.',
        style: styles
    },
    {
        selector: '.sixth-step',
        content: 'You can style your notes with the toolbar. It also allows you to add links and images.',
        style: styles
    },
    {
        selector: '.seventh-step',
        content: 'Happy note-taking!',
        style: styles
    }
];

class App extends Component {
    constructor(props){
        super(props);

        this.state = {
            isTourOpen: true
        }
    }

    closeTour = () => {
        this.setState({ isTourOpen: false });
    };
    //
    // openTour = () => {
    //     this.setState({ isTourOpen: true });
    // };

    componentWillMount() {
        this.props.fetchUser();
        //this.props.getDataObject();
    }

    render() {
        return (
            <div className="app">
                <BrowserRouter >
                    <div>
                        <Route path="/main" component={Dashboard} />
                        <Route exact path="/" component={LandingPage} />

                    </div>
                </BrowserRouter>

                <Tour
                    steps={steps}
                    isOpen={this.state.isTourOpen}
                    onRequestClose={this.closeTour}
                    style={styles}
                />
            </div>
        );
    }
}

export default connect(null, actions)(App);

