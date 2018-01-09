import React from 'react';
import Panel from './panel';
import NavBar from './navbar/navbar';
import Login from './login';
import '../assets/css/login.css';

export default props => {
    return (
        <div>
            <div className="login">
                <Login />
            </div>
            <NavBar />
            <Panel />
        </div>
    );
}