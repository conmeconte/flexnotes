import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setTopLeftHeight, setTopLeftWidth, updateBinderArray } from '../actions';
import SplitPane from 'react-split-pane';
import _ from 'lodash';
import Video from './video';
import Notes from './notes';
import Slides from './slides';
import Modal from './modal';

class ThreePanel extends Component {
    constructor(props) {
        super(props);
        // this.logTopLeftHeight = this.logTopLeftHeight.bind(this);
        // this.logTopLeftWidth = this.logTopLeftWidth.bind(this);
    }

    // logTopLeftHeight(size) {
    //     this.props.setTopLeftHeight(size, this.props.interface_obj);
    // }

    // logTopLeftWidth(size) {
    //     this.props.setTopLeftWidth(size, this.props.interface_obj);
    // }

    // componentWillMount() {
    //     //this.props.updateBinderArray();
    // }

    // componentWillReceiveProps(nextProps) {
    //     let tabArrLength = this.props.binderObj.tab_arr_obj.length;
    //     let tabIndex = null;
    //     let pageIndex = null;
    //     for (let i = 0; i < tabArrLength; i++) {
    //         if (this.props.interface_obj.tab_id === this.props.binderObj.tab_arr_obj[i]._id) {
    //             tabIndex = i;
    //             break;
    //         }
    //     }
    //     const { page_arr_obj } = this.props.binderObj.tab_arr_obj[tabIndex];
    //     for (let i = 0; i < tabArrLength; i++) {
    //         if (this.props.interface_obj.page_id === page_arr_obj[i]._id) {
    //             pageIndex = i;
    //             break;
    //         }
    //     }
    //     if (typeof page_arr_obj[pageIndex].panel_dimensions === 'undefined') {
    //         topLeftPanelHeight = 500;
    //         topLeftPanelWidth = 425;
    //     } else {
    //         topLeftPanelHeight = page_arr_obj[pageIndex].panel_dimensions.top_left_panel_height;
    //         topLeftPanelWidth = page_arr_obj[pageIndex].panel_dimensions.top_left_panel_width;
    //     }
    // }
    // componentWillReceiveProps(nextProps) {
    //     if (nextProps.interface_obj.page_id !== this.props.interface_obj.page_id) {
    //         console.log("save panel dimsensions now");
    //         //save panel dimensions here.

    //     } else {
    //         return;
    //     }
    // }

    render() {
        console.log('panel three props:', this.props);
        // const loTLHsave = _.debounce((size) => {
        //     this.logTopLeftHeight(size);
        // }, 300);

        // const loTLWsave = _.debounce((size) => {
        //     this.logTopLeftWidth(size);
        // }, 300);

        // let { tab_arr_obj } = this.props.binderObj;
        // let { interface_obj } = this.props;

        // if (tab_arr_obj) {
        //     let tabArrLength = tab_arr_obj.length;
        //     let tabIndex = null;
        //     let pageIndex = null;
        //     for (let i = 0; i < tabArrLength; i++) {
        //         if (interface_obj.tab_id === tab_arr_obj[i]._id) {
        //             tabIndex = i;
        //             break;
        //         }
        //     }
        //     const { page_arr_obj } = tab_arr_obj[tabIndex];
        //     for (let i = 0; i < page_arr_obj.length; i++) {
        //         // for (let i = 0; i < tabArrLength; i++) {
        //         if (interface_obj.page_id === page_arr_obj[i]._id) {
        //             pageIndex = i;
        //             breakd
        //         }
        //     }
        // if (typeof page_arr_obj[pageIndex].panel_dimensions === 'undefined') {
        return (
            <SplitPane className={`width-w-nav ${this.props.interface_obj.navbar_min ? 'full_width' : ''}`} split="vertical" minSize={300} maxSize={1000} defaultSize={425}>
                <SplitPane split="horizontal" minSize={300} maxSize={600} defaultSize={450}>
                    <div className="video-parent-panel"><Video /></div>
                    <div className="slides-container"><Slides /></div>
                    <div className="hakuna-matata">hello</div>
                </SplitPane>
                <div className="notes-parent-panel"><Notes /></div>
            </SplitPane>
        )
        // }
        //     else {
        //         return (
        //             <SplitPane onChange={loTLHsave} className="width-w-nav" split="vertical" minSize={200} maxSize={-200} defaultSize={page_arr_obj[pageIndex].panel_dimensions.top_left_panel_height}>
        //                 <SplitPane onChange={loTLWsave} split="horizontal" minSize={200} maxSize={-200} defaultSize={page_arr_obj[pageIndex].panel_dimensions.top_left_panel_width}>
        //                     <div className="video-parent-panel"><Video /></div>
        //                     <div className="slides-container"><Slides /></div>
        //                 </SplitPane>
        //                 <div className="notes-parent-panel"><Notes /></div>
        //             </SplitPane>
        //         )
        //     }
        // } else {
        //     return <h2>Loading...</h2>
        // }
    }
}

function mapStateToProps(state) {
    return {
        interface_obj: state.interface,
        binderObj: state.binder.binderObj
    }
}

export default connect(mapStateToProps, { setTopLeftHeight, setTopLeftWidth, updateBinderArray })(ThreePanel);