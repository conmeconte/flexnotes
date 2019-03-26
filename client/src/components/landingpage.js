import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import googleButton from '../assets/images/google-login.png';
import backgroundImage from '../assets/images/landing-background.png';
import Login from './login';
import { fetchSampleUser } from '../actions/index';
import logo from '../assets/images/logo.png';
const backgroundImg = {
  background: `url('${backgroundImage}')`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover'
};
class LandingPage extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return <div />;
      default:
        return (
            <div className="main-login-container">
                {this.renderContent()}
                <div className="top-background-layer"></div>
                <div style={backgroundImg} className="landing-page-container">
                    <div className="title-container">
                        <h1><img className="landingLogo" src={logo} /><span className="flex">Flex</span>Notes</h1>
                    </div>
                    <div className="login-container">
                        <div className="blur"></div>
                        <div className="info">
                            <h3>User-friendly Notes</h3>
                            <h3>Web Application</h3>
                            <ul className="item-list">
                                <li>
                                    {/* <span className="glyphicon glyphicon-pencil"></span> */}
                                    <i className="material-icons landing">edit</i>
                                    <div className="item-text">Organize material through binders, tabs, and pages!</div>
                                </li>
                                <li>
                                    {/* <span className="glyphicon glyphicon-thumbs-up"></span> */}
                                    <i className="material-icons landing">thumb_up</i>
                                    <div className="item-text">Easy to use</div>
                                </li>
                                <li>
                                    {/* <span className="glyphicon glyphicon-wrench"></span> */}
                                    <i className="material-icons landing">build</i>
                                    <div className="item-text">Customizable User Interface</div>
                                </li>
                                <li>
                                    {/* <span className="glyphicon glyphicon-pencil"></span> */}
                                    <i className="material-icons landing">featured_video</i>
                                    <div className="item-text">Text editor, videos, slides, and more!</div>
                                </li>

                            </ul>
                        </div>
                        <div className="google-div">
                            <div className="login-info">
                                <h3 className="login-info-h3">{!this.props.auth ? 'Sign In' : 'Sign Out'} <span className={!this.props.auth ? 'glyphicon glyphicon-user' : ''}></span></h3>
                                <div className="login-logout-container"><Login /></div>
                                <button onClick={this.props.fetchSampleUser} className="btn sample">Try it!</button>
                            </div>
                        </div>
                    </div>
                    <div className="email-wrapper">
                        <span>Privacy</span><a href="/privacy">Our Privacy Policy</a>
                        <span>Contact Us: </span><a href="mailto:info.flexnotes@gmail.com">info.flexnotes@gmail.com</a>
                    </div>
                </div>
            </div>
        );
    }
  }
  render() {
    return (
      <div className="main-login-container">
        {this.renderContent()}
        <div className="top-background-layer" />
        <div style={backgroundImg} className="landing-page-container">
          <div className="title-container">
            <h1>
              <img className="landingLogo" src={logo} />
              <span className="flex">Flex</span>Notes
            </h1>
          </div>
          <div className="login-container">
            <div className="blur" />
            <div className="info">
              <h3>User-friendly Notes</h3>
              <h3>Web Application</h3>
              <ul className="item-list">
                <li>
                  <i className="material-icons landing">edit</i>
                  <div className="item-text">
                    Organize material through binders, tabs, and pages!
                  </div>
                </li>
                <li>
                  <i className="material-icons landing">thumb_up</i>
                  <div className="item-text">Easy to use</div>
                </li>
                <li>
                  <i className="material-icons landing">build</i>
                  <div className="item-text">Customizable User Interface</div>
                </li>
                <li>
                  <i className="material-icons landing">featured_video</i>
                  <div className="item-text">
                    Text editor, videos, slides, and more!
                  </div>
                </li>
              </ul>
            </div>
            <div className="google-div">
              <div className="login-info">
                <h3 className="login-info-h3">
                  {!this.props.auth ? 'Sign In' : 'Sign Out'}{' '}
                  <span
                    className={
                      !this.props.auth ? 'glyphicon glyphicon-user' : ''
                    }
                  />
                </h3>
                <div className="login-logout-container">
                  <Login />
                </div>
                <button
                  onClick={this.props.fetchSampleUser}
                  className="btn sample"
                >
                  Try it!
                </button>
              </div>
            </div>
          </div>
          <div className="email-wrapper">
            <span>Privacy Policy</span><a href="/privacy">Our Privacy Policy</a>
            <span>Contact Us: </span><a href="mailto:info.flexnotes@gmail.com">info.flexnotes@gmail.com</a>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, { fetchSampleUser })(LandingPage);
