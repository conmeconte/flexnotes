import React, { Component } from 'react';
import Video from './video';
import Notes from './notes';
import Slides from './slides';
import Modal from './modal';
import '../assets/css/panel.css';
import { SortablePane, Pane } from 'react-sortable-pane';

class Panel extends Component {
    render () {
        return (

            <div className="container-fluid text-center">
                <div className="row col-xs-5">
                <SortablePane className="col-xs-6" direction="horizontal" margin={5}>
                    <Pane id={0} key={0} width={300} height={300}><div className="panels"><Slides/></div></Pane>
                    <Pane id={1} key={1} isSortable="true" width={300} height={300}><div className="panels"><Notes/></div></Pane>
                    <Pane id={2} key={2} isSortable="true" width={300} height={300}><div className="panels video"><Video/></div></Pane>
                    <Pane id={3} key={3} isSortable="true" width={300} height={300}><div className="panels">Meistertask/To Do</div></Pane>
                </SortablePane>
                </div>
                <Modal/>
            </div>
        );
    }
}

export default Panel;