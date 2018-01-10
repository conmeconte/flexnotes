import React from 'react';
import Binder from './binder';

export default props => {
    return (
        <div className="navbar col-xs-2">
            <Binder />
            <div className="contain-tab">
                <h4 className="nav_header"></h4>
            </div>
            <div className="contain-page">
                <h4 className="nav_header"></h4>
            </div>
        </div>
    );
}