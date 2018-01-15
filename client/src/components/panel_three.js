import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setTopLeftHeight, setTopLeftWidth } from '../actions';
import SplitPane from 'react-split-pane';

import Video from './video';
import Notes from './notes';
import Slides from './slides';
import Modal from './modal';

class ThreePanel extends Component {
    constructor(props) {
        super(props);
        this.logTopLeftHeight = this.logTopLeftHeight.bind(this);
        this.logTopLeftWidth = this.logTopLeftWidth.bind(this);
    }

    logTopLeftHeight(size) {
        this.props.setTopLeftHeight(size);
    }

    logTopLeftWidth(size) {
        this.props.setTopLeftWidth(size);
    }

    render() {
        return (
            <SplitPane onChange={size => { this.logTopLeftHeight(size) }} className="width-w-nav" split="horizontal" minSize={200} maxSize={-200} defaultSize={400}>
                <SplitPane onChange={size => { this.logTopLeftWidth(size) }} split="vertical" minSize={200} maxSize={-200} defaultSize={400}>
                    <div className="slides-container"><Slides /></div>
                    <div className="video-parent-panel"><Video /></div>
                </SplitPane>
                <div className="notes-parent-panel"><Notes /></div>
            </SplitPane>
        )
    }
}

function mapStateToProps(state) {
    return {
        tlh: state.panelSpecs.topLeftHeight,
        tlw: state.panelSpecs.topLeftWidth,
    }
}

export default connect(mapStateToProps, { setTopLeftHeight, setTopLeftWidth })(ThreePanel);