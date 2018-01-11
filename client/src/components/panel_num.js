import React, { Component } from 'react';
import SplitPane from 'react-split-pane';
import Video from './video';
import Notes from './notes';
import Slides from './slides';
import Modal from './modal';

class PanelNum extends Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     vertical_width: 400,
        //     horizontal_left: 400,
        //     horizontal_right: 400,
        // }
    }

    render() {
        // make methods to check sizes:
        // onChange={size => this.logVWsize(size)}
        // onChange={size => this.logHLsize(size)}
        // onChange={size => this.logHRsize(size)}
        console.log("panel_num stuff: ", this.props.num);
        switch (this.props.num) {
            case '3':
                return (
                    <SplitPane className="width-w-nav" split="horizontal" minSize={200} maxSize={-200} defaultSize={400}>
                        <SplitPane split="vertical" minSize={200} maxSize={-200} defaultSize={400}>
                            <div className="slides-container"><Slides /></div>
                            <div className="video-parent-panel"><Video /></div>
                        </SplitPane>
                        <div className="notes-parent-panel"><Notes /></div>
                    </SplitPane>
                )
            case '4':
                return (
                    <SplitPane className="width-w-nav" split="vertical" minSize={200} maxSize={-200} defaultSize={400}>
                        <SplitPane split="horizontal" minSize={200} maxSize={-200} defaultSize={400}>
                            <div className="slides-container"><Slides /></div>
                            <div className="notes-parent-panel"><Notes /></div>
                        </SplitPane>
                        <SplitPane split="horizontal" minSize={200} maxSize={-200} defaultSize={400}>
                            <div className="video-parent-panel"><Video /></div>
                            <div>MeisterTask</div>
                        </SplitPane>
                    </SplitPane>
                )
            default:
                return null;
        }
    }
}

export default PanelNum;