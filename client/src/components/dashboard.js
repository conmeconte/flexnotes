import React from 'react';

import Panel from './panel';
import NavBar from './navbar/navbar';
import Login from './login';

export default props => {
    return (
        <div>
            <Login />
            <div style={{ display: 'inline-block' }}>
                <NavBar />
                <Panel />
            </div>
        </div>
    );
}