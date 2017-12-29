import React, { Component } from 'react';
import Video from './video';
import Notes from './notes';
import Modal from './modal';
import '../assets/css/panel.css';

class Panel extends Component {
    render () {
        return (
            <div className="container-fluid text-center">
                <div className="row col-xs-5">
                    <div className="panels">Lectures</div>
                    <div className="panels"><Notes/></div>
                </div>
                <div className="row col-xs-5">
                    <div className="panels video"><Video/></div>
                    <div className="panels">Meistertask/To Do</div>
                </div>
                <Modal/>
            </div>
        );
    }
}

export default Panel;