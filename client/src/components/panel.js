import React, { Component } from 'react';
import Video from './video';
import Notes from './notes';
import Slides from './slides';
import Modal from './modal';
import '../assets/css/panel.css';
// import { SortablePane, Pane } from 'react-sortable-pane';
// import Resizable from 're-resizable';
import SplitPane from 'react-split-pane';

class Panel extends Component {
    render() {
        return (
            <div>
                {/* <SplitPane split="vertical" defaultSize={200}>
                    <div><Notes/></div>
                    <div><Video/></div>
                    <div><Slides/></div>
                    <div>MeisterTask</div>
                </SplitPane> */}
                <SplitPane split="vertical" minSize={200} defaultSize={400}>
                    <SplitPane split="horizontal" minSize={200} defaultSize={400}>
                        <div><Slides/></div>
                        <div><Video/></div>
                     </SplitPane>
                     <SplitPane split="horizontal" minSize={200} defaultSize={400}>
                        <div className="notes-parent-panel"><Notes/></div>
                        <div>MeisterTask</div>
                     </SplitPane>
                </SplitPane>
            </div>
        );
    }
}

export default Panel;