import React, { Component } from 'react';
import { BrowserRouter, Route} from 'react-router-dom';
import { connect} from 'react-redux';
import * as actions from "../actions";
import googleButton from '../assets/images/google-login.png';
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
                    </div>
                    <div className="login-container">
                        <div className="blur"></div>
                        <div className="info">
                        <h3>User-friendly Notes</h3>
                        <h3>Web Application</h3>
                            <ul className="item-list">
                                <li>
                                    <span className="glyphicon glyphicon-thumbs-up"></span>
                                    <div className="item-text">Easy to use</div>
                                </li>
                                <li>
                                    <span className="glyphicon glyphicon-wrench"></span>
                                    <div className="item-text">Customizable user interface</div>
                                </li>
                                <li>
                                    <span className="glyphicon glyphicon-pencil"></span>
                                    <div className="item-text">Text editor, videos, slides, and more!</div>
                                </li>
                            </ul>
                        </div>
                        <div className="google-div">
                            <div className="login-info">
                                <h3>{ !this.props.auth  ? 'Sign In': 'Sign Out'} <span className={ !this.props.auth  ? 'glyphicon glyphicon-user': ''}></span></h3>
                                <div className="login-logout-container"><Login/></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps)(LandingPage); 