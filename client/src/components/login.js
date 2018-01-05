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
                    <li><a href="/auth/google"><img src={googleButton} /></a></li>
                );
            default:
                return <li><a href="/api/logout">Logout</a></li>;
        }
    }

    render() {
        // console.log(this.props);
        return (
            <nav>
                <div className="nav-wrapper">
                    {/* ternary expression  */}
                    {/* <Link to={this.props.auth ? '/main' : '/'} className="left brand-logo"> 
                FlexNote</Link> */}
<<<<<<< HEAD
                    <ul className="right">
                        {this.renderContent()}
                    </ul>
                </div>
            </nav>

=======
                <ul className="right">
                    {this.renderContent()}
                </ul>
            </div>
        </nav>      
>>>>>>> 1286a345e8d19a375132d46c02a4513ef70ae5cd
        );
    }
}
function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps)(Login); 
