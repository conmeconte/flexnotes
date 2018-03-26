import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
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

class App extends Component {
  componentWillMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      <div className="app">
        <Router>
          <div>
            <Route path="/main" component={Dashboard} />
            <Route exact path="/" component={LandingPage} />
          </div>
        </Router>
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
