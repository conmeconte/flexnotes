// import React from 'react';


// //need to make that when link is clicked it takes to auth/google. server will return back to the page, need to have a switch conditional where it checks if the user logged in correctly
// //and make it chage to log out button, i put a similar example on the bottom. 
// //for now when clicked pops error. but after ~3 seconds it logs in but it desn't change to logged
// function Login(){
//     return (
//         <div>
//             <a href="/auth/google" className="g-signin2" ></a>
//         </div>
//     )
// }

// export default Login;



import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component{
    renderContent(){
        switch (this.props.auth){
            case null:
                return;
            case false:
                return (
                    <li><a href="/auth/google">Log in With Google</a></li>
                );
            default:
                return <li><a href="/api/logout">Logout</a></li>;
        }
    }
    
    render() {
        // console.log(this.props);
        return(
        <nav>
            <div className="nav-wrapper">
            {/* ternary expression  */}
                <Link to={this.props.auth ? '/main' : '/'} className="left brand-logo"> 
                FlexNote</Link>
                <ul className="right">
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

export default connect(mapStateToProps)(Header); 