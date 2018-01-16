import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setTopLeftHeight, setTopLeftWidth, setTopRightHeight } from '../actions';
import SplitPane from 'react-split-pane';

import Video from './video';
import Notes from './notes';
import Slides from './slides';
import Modal from './modal';

class FourPanel extends Component {
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
        const loTLHsave = _.debounce((size) => {
            this.logTopLeftHeight(size);
        }, 300);

        const loTLWsave = _.debounce((size) => {
            this.logTopLeftWidth(size);
        }, 300);

        const loTRHsave = _.debounce((size) => {
            this.logTopRightHeight(size);
        }, 300);


        return (
            <SplitPane onChange={loTLWsave} className="width-w-nav" split="vertical" minSize={200} maxSize={-200} defaultSize={400}>
                <SplitPane onChange={loTLHsave} split="horizontal" minSize={200} maxSize={-200} defaultSize={400}>
                    <div className="slides-container"><Slides /></div>
                    <div className="notes-parent-panel"><Notes /></div>
                </SplitPane>
                <SplitPane onChange={loTRHsave} split="horizontal" minSize={200} maxSize={-200} defaultSize={400}>
                    <div className="video-parent-panel"><Video /></div>
                    <div>MeisterTask</div>
                </SplitPane>
            </SplitPane>
        )
    }
}

function mapStateToProps(state) {
    return {
        tlh: state.panelSpecs.topLeftHeight,
        tlw: state.panelSpecs.topLeftWidth,
        trh: state.panelSpecs.topRightHeight,
    }
}

export default connect(mapStateToProps, { setTopLeftHeight, setTopLeftWidth, setTopRightHeight })(FourPanel);