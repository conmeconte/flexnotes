import React, { Component } from 'react';
import '../assets/css/landing-page.css';
import googleButton from '../assets/images/google-login.png';
import 'bootstrap/dist/css/bootstrap.min.css';

class LandingPage extends Component {
    render () {
        return(
            <div className="landing-page-container container">
                <h1><span className="flex">Flex</span>Notes</h1>
                <h2>User-friendly Notes Web Application</h2>
                <div className="login-container">
                    <div className="info">
                    <h3>Get Started</h3>
                        <ul className="item-list">
                            <li><span className="glyphicon glyphicon-thumbs-up"></span> Easy to use</li>
                            <li><span className="glyphicon glyphicon-wrench"></span> Customizable UI</li>
                            <li><span className="glyphicon glyphicon-text-size"></span> Text editor, videos, slides, and more!</li>
                        </ul>
                    </div>
                    <div className="google-div">
                        <div className="login-info">
                            <h3>Sign In</h3>
                            <div className="glyphicon glyphicon-user"></div>
                            <img  src={googleButton}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LandingPage;