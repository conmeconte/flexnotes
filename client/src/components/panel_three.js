import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setTopLeftHeight, setTopLeftWidth } from '../actions';
import SplitPane from 'react-split-pane';
import _ from 'lodash';

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
        this.props.setTopLeftHeight(size, this.props.interface_obj);
    }

    logTopLeftWidth(size) {
        this.props.setTopLeftWidth(size, this.props.interface_obj);
    }

    render() {
        const loTLHsave = _.debounce((size) => {
            this.logTopLeftHeight(size);
        }, 300);

        const loTLWsave = _.debounce((size) => {
            this.logTopLeftWidth(size);
        }, 300);

        return (
            <SplitPane onChange={loTLHsave} className="width-w-nav" split="vertical" minSize={200} maxSize={-200} defaultSize={500}>
                <SplitPane onChange={loTLWsave} split="horizontal" minSize={200} maxSize={-200} defaultSize={425}>
                    <div className="video-parent-panel"><Video /></div>
                <div className="slides-container"><Slides /></div>
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
        interface_obj: state.interface
    }
}

export default connect(mapStateToProps, { setTopLeftHeight, setTopLeftWidth })(ThreePanel);