import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
//import * as actions from "../actions";
import { fetchUser, fetchSampleUser } from '../actions/index';
import LandingPage from './landingpage';
import Dashboard from './dashboard';
import 'normalize.css/normalize.css';
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
  }

  // componentWillReceiveProps(nextProps){
  //     if(nextProps.auth !== this.props.auth){
  //         if(nextProps.auth === false){
  //             this.props.fetchSampleUser();
  //         }
  //     }
  // }

  render() {
    return (
      <div className="app">
        <BrowserRouter>
          <div>
            {/* <Route exact path="/api/sample" component={LandingPage} /> */}
            <Route path="/main" component={Dashboard} />
            <Route exact path="/" component={LandingPage} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps, { fetchUser })(App);
