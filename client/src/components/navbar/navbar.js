import React from 'react';
import Nav from './nav';

export default props => {
    return(
        <div className="navbar col-xs-2">
            <Nav/>
            <div className="contain-tab">
                <h4 className="nav_header">Tabs</h4>
                <hr/>
            </div>
            <div className="contain-page">
                <h4 className="nav_header">Pages</h4>
                <hr/>
            </div>   
        </div>
    );
}