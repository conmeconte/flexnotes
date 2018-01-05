import React from 'react';

import Panel from './panel';
import NavBar from './navbar/navbar';
import Login from './login';

export default props => {
    return (
        <div>
            <Login />
            <NavBar />
            <Panel />
        </div>
    );
}