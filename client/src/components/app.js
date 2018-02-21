import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from "../actions";
import LandingPage from './landingpage';
import Dashboard from './dashboard';
import 'materialize-css/dist/css/materialize.min.css';
import '../assets/css/landing-page.css';
import '../assets/css/modal.css';
import '../assets/css/navbar.css';
import '../assets/css/notes.css';
import '../assets/css/panel.css';
import '../assets/css/slides.css';
import '../assets/css/video-add-modal.css';
import '../assets/css/video.css';




//import { getDataObject } from './../actions/index';

// import 'materialize-css/dist/css/materialize.min.css';
// import { getDataObject } from './../actions/index';



class App extends Component {


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


            </div>
        );
    }
}

export default connect(null, actions)(App);

