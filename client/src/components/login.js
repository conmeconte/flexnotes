import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import googleButton from "../assets/images/google-login.png";

class Login extends Component {
    renderContent() {
        switch (this.props.auth) {
            case null:
                return;
            case false:
                return (
                    <a href="/auth/google"><img src={googleButton} /></a>
                );
            default:
                return <a className="landing-login-text" href="/api/logout"><button className="logoutBtn"><i className="material-icons">exit_to_app</i></button></a>
        }
    }

    render() {
        // console.log(this.props);
        return (
            <div>
                <div className="nav-wrapper">
                    {/* <ul className="right"> */}
                        {this.renderContent()}
                    {/* </ul> */}
                </div>
            </div>
        );
    }
}
function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps)(Login); 
