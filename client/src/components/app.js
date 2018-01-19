import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from "../actions";

import LandingPage from './landingpage';
import Dashboard from './dashboard';
//import { getDataObject } from './../actions/index';


class App extends Component {
    componentWillMount() {
        this.props.fetchUser();
        //this.props.getDataObject();
    }

    componentDidMount(){
        
    }

    render() {
        return (
            <div>
                <BrowserRouter >

                    <div className="container-fluid" >
                        <Route path="/main" component={Dashboard} />
                        <Route exact path="/" component={LandingPage} />

                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default connect(null, actions)(App);

