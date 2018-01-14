import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setTopLeftHeight, setTopLeftWidth, setTopRightHeight } from '../actions';
import SplitPane from 'react-split-pane';

import Video from './video';
import Notes from './notes';
import Slides from './slides';
import Modal from './modal';

class PanelNum extends Component {
    constructor(props) {
        super(props);
        this.logTopLeftHeight = this.logTopLeftHeight.bind(this);
        this.logTopLeftWidth = this.logTopLeftWidth.bind(this);
        this.logTopRightHeight = this.logTopRightHeight.bind(this);
    }

    logTopLeftHeight(size) {
        this.props.setTopLeftHeight(size);
    }

    logTopLeftWidth(size) {
        this.props.setTopLeftWidth(size);
    }

    logTopRightHeight(size) {
        this.props.setTopRightHeight(size);
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
                    <SplitPane onChange={size => { this.logTopLeftHeight(size) }} className="width-w-nav" split="horizontal" minSize={200} maxSize={-200} defaultSize={400}>
                        <SplitPane onChange={size => { this.logTopLeftWidth(size) }} split="vertical" minSize={200} maxSize={-200} defaultSize={400}>
                            <div className="slides-container"><Slides /></div>
                            <div className="video-parent-panel"><Video /></div>
                        </SplitPane>
                        <div className="notes-parent-panel"><Notes /></div>
                    </SplitPane>
                )
            case '4':
                return (
                    <SplitPane onChange={size => { this.logTopLeftWidth(size) }} className="width-w-nav" split="vertical" minSize={200} maxSize={-200} defaultSize={400}>
                        <SplitPane onChange={size => { this.logTopLeftHeight(size) }} split="horizontal" minSize={200} maxSize={-200} defaultSize={400}>
                            <div className="slides-container"><Slides /></div>
                            <div className="notes-parent-panel"><Notes /></div>
                        </SplitPane>
                        <SplitPane onChange={size => { this.logTopRightHeight(size) }} split="horizontal" minSize={200} maxSize={-200} defaultSize={400}>
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

function mapStateToProps(state) {
    return {
        tlh: state.panelSpecs.topLeftHeight,
        tlw: state.panelSpecs.topLeftWidth,
        trh: state.panelSpecs.topRightHeight,
    }
}

export default connect(mapStateToProps, { setTopLeftHeight, setTopLeftWidth, setTopRightHeight })(PanelNum);