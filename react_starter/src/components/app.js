import React from 'react';
import '../assets/css/app.css';
import logo from '../assets/images/logo.svg';

import Nav from './navbar/nav';
import Modal from './modal';

const App = () => (
    <div>
        <div className="app">
            <Nav/>
            <img src={logo} className="logo rotate"/>
            <h1>Welcome to React</h1>
        </div>
        <Modal />
    </div>
);

export default App;
