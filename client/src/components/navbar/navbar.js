import React from 'react';
import Nav from './nav';

export default props => {
    return(
        <div className="navbar">
            <Nav/>
            <div className="contain-tab">
                <h4 className="nav_header"></h4>            
            </div>
            <div className="contain-page">
                <h4 className="nav_header"></h4>
            </div>   
        </div>
    );
}