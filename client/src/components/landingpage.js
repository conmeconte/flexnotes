import React, { Component } from 'react';
import { BrowserRouter, Route} from 'react-router-dom';
import { connect} from 'react-redux';
import * as actions from "../actions";
import backgroundImage from '../assets/images/landing-background.png';
import Login from './login';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/landing-page.css';

const backgroundImg = {
    background: `url('${backgroundImage}')`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
}

class LandingPage extends Component {
    render () {
        return(
            <div className="main-login-container">
                <div className="top-background-layer"></div>
                <div style={backgroundImg} className="landing-page-container">
                    <div className="title-container">
                        <h1><span className="flex">Flex</span>Notes</h1>
                        <h2>User-friendly Notes Web Application</h2>
                    </div>
                    <div className="login-container">
                        <div className="blur"></div>
                        <div className="info">
                            <h3>Get Started</h3>
                            <ul className="item-list">
                                <li>
                                    <span className="glyphicon glyphicon-thumbs-up"></span>
                                    <div className="item-text">Easy to use</div>
                                </li>
                                <li>
                                    <span className="glyphicon glyphicon-wrench"></span>
                                    <div className="item-text">Customizable UI</div>
                                </li>
                                <li>
                                    <span className="glyphicon glyphicon-pencil"></span>
                                    <div className="item-text">Text editor, videos, slides, and more!</div>
                                </li>
                            </ul>
                        </div>
                        <div className="google-div">
                            <div className="login-info">
                                <h3>Sign In <span className="glyphicon glyphicon-user"></span></h3>
                                <Login/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LandingPage;