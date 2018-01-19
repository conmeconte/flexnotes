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

        let tabArrLength = this.props.binderObj.tab_arr_obj.length;
        let tabIndex = null;
        let pageIndex = null;
        let topLeftPanelHeight;
        let topLeftPanelWidth;
        for (let i = 0; i < tabArrLength; i++) {
            if (this.props.interface_obj.tab_id === this.props.binderObj.tab_arr_obj[i]._id) {
                tabIndex = i;
                break;
            }
        }
        const { page_arr_obj } = this.props.binderObj.tab_arr_obj[tabIndex];
        for (let i = 0; i < tabArrLength; i++) {
            if (this.props.interface_obj.page_id === page_arr_obj[i]._id) {
                pageIndex = i;
                break;
            }
        }
        if (typeof page_arr_obj[pageIndex].panel_dimensions === 'undefined') {
            topLeftPanelHeight = 500;
            topLeftPanelWidth = 425;
        } else {
            topLeftPanelHeight = page_arr_obj[pageIndex].panel_dimensions.top_left_panel_height;
            topLeftPanelWidth = page_arr_obj[pageIndex].panel_dimensions.top_left_panel_width;
        }
        return (
            <SplitPane onChange={loTLHsave} className="width-w-nav" split="vertical" minSize={200} maxSize={-200} defaultSize={topLeftPanelHeight}>
                <SplitPane onChange={loTLWsave} split="horizontal" minSize={200} maxSize={-200} defaultSize={topLeftPanelWidth}>
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
        interface_obj: state.interface,
        binderObj: state.binder.binderObj,
    }
}

export default connect(mapStateToProps, { setTopLeftHeight, setTopLeftWidth })(ThreePanel);