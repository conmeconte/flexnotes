import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Login extends Component{
    renderContent(){
        switch (this.props.auth){
            case null:
                return;
            case false:
                return (
                    <li><a href="/auth/google" className="g-signin2" data-onsuccess="onSignIn" data-theme="dark"></a></li>
                );
            default:
                return <li><a href="/api/logout">Logout</a></li>;
        }
    }

    render() {
        console.log(this.props);
        return(
        <nav>
            <div>
                <ul>
                    {this.renderContent()}
                </ul>
            </div>
        </nav>
        
        );
    }
}
function mapStateToProps({ auth }){
    return {auth};
}
export default connect(mapStateToProps)(Login);
