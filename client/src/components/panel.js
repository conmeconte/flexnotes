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
    constructor(props) {
        super(props);
        this.state = {
            vertical_width: 400,
            horizontal_left: 400,
            horizontal_right: 400,
        };
        this.sendSize = this.sendSize.bind(this);
    }

    logVWsize(panelSize) {
        console.log("vw size: ", panelSize);

        const { vertical_width } = this.state;
        this.setState({
            vertical_width: panelSize
        });
    }

    logHLsize(panelSize) {
        console.log("hl size: ", panelSize);

        const { horizontal_left } = this.state;
        this.setState({
            horizontal_left: panelSize
        });
    }

    logHRsize(panelSize) {
        console.log("hr size: ", panelSize);

        const { horizontal_right } = this.state;
        this.setState({
            horizontal_right: panelSize
        });
    }

    sendSize() {
        const { vertical_width, horizontal_left, horizontal_right } = this.state;
        console.log('vertical_width: ', vertical_width);
        console.log('horizontal_right: ', horizontal_right);
        console.log('horizontal_left: ', horizontal_left);
        //do an axios.post with these values ^
    }
    render() {
        const { vertical_width, horizontal_left, horizontal_right } = this.state;
        return (
            <div>
                <div className="col-xs-10">
                    {/* <button onClick={this.sendSize} className="btn btn-primary">Save</button> */}
                    <h1 className="app-title">FlexNote</h1>
                </div>
                <div className="panel_div col-xs-10">
                    <SplitPane className="width-w-nav" onChange={size => this.logVWsize(size)} split="vertical" minSize={200} maxSize={-200} defaultSize={vertical_width}>
                        <SplitPane onChange={size => this.logHLsize(size)} split="horizontal" minSize={200} maxSize={-200} defaultSize={horizontal_left}>
                            <div><Slides /></div>
                            <div className="video-parent-panel"><Video /></div>
                        </SplitPane>
                        <SplitPane onChange={size => this.logHRsize(size)} split="horizontal" minSize={200} maxSize={-200} defaultSize={horizontal_right}>
                            <div className="notes-parent-panel"><Notes /></div>
                            <div>MeisterTask</div>
                        </SplitPane>
                    </SplitPane>
                </div>
            </div>
        );
    }
}

export default Panel;