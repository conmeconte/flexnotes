import React from 'react';
import '../assets/css/app.css';
import logo from '../assets/images/logo.svg';
// import Panel from './panel/panel';
// import Video from './video/video';

import Modal from './modal';

const App = () => (
    <div>
        <div className="app">
            <img src={logo} className="logo rotate"/>
            <h1>Welcome to React</h1>
        </div>
        <Modal />
    </div>
);

export default App;
