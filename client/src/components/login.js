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
                return <a href="/api/logout"><button className="btn btn-sm">Logout <span className="glyphicon glyphicon-log-out"></span></button></a>
        }
    }

    render() {
        // console.log(this.props);
        return (
            <nav>
                <div className="nav-wrapper">
                    <ul className="right">
                        {this.renderContent()}
                    </ul>
                </div>
            </nav>
        );
    }
}
function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps)(Login); 
