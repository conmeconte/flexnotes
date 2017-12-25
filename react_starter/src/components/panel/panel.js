import React, { Component } from 'react';
import Video from '../video/video';
import Modal from '../modal';
import './panel.css';

class Panel extends Component {
    render () {
        return (
            <div className="container text-center">
                <div className="row col-xs-6">
                    <div className="panels">Lectures</div>
                    <div className="panels">Notes</div>
                </div>
                <div className="row col-xs-6">
                    <div className="panels video"><Video/></div>
                    <div className="panels">Meistertask</div>
                </div>
                <Modal/>
            </div>
        );
    }
}

export default Panel;