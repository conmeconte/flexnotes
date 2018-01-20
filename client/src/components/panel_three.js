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
        this.logTopLeftHeight = this.logTopLeftHeight.bind(this);
        this.logTopLeftWidth = this.logTopLeftWidth.bind(this);
    }

    logTopLeftHeight(size) {
        this.props.setTopLeftHeight(size, this.props.interface_obj);
    }

    logTopLeftWidth(size) {
        this.props.setTopLeftWidth(size, this.props.interface_obj);
    }

    componentWillMount() {
        //     let { tab_arr_obj } = this.props.binderObj;
        //     let { interface_obj } = this.props;

        //     if (tab_arr_obj) {
        //         let tabArrLength = tab_arr_obj.length;
        //         let tabIndex = null;
        //         let pageIndex = null;
        //         for (let i = 0; i < tabArrLength; i++) {
        //             if (interface_obj.tab_id === tab_arr_obj[i]._id) {
        //                 tabIndex = i;
        //                 break;
        //             }
        //         }
        //         const { page_arr_obj } = tab_arr_obj[tabIndex];
        //         for (let i = 0; i < tabArrLength; i++) {
        //             if (interface_obj.page_id === page_arr_obj[i]._id) {
        //                 pageIndex = i;
        //                 break;
        //             }
        //         }
        //         if (!page_arr_obj[pageIndex].panel_dimensions) {
        //             return;
        //         } else {
        //             this.props.setTopLeftHeight(page_arr_obj[pageIndex].panel_dimensions.top_left_panel_height, interface_obj);
        //             this.props.setTopLeftWidth(page_arr_obj[pageIndex].panel_dimensions.top_left_panel_width, interface_obj);
        //         }
        //     } else {
        //         console.log("DOES NOT WORK");
        //     }
        this.props.updateBinderArray();
    }

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

    render() {
        const loTLHsave = _.debounce((size) => {
            this.logTopLeftHeight(size);
        }, 300);

        const loTLWsave = _.debounce((size) => {
            this.logTopLeftWidth(size);
        }, 300);

        let { tab_arr_obj } = this.props.binderObj;
        let { interface_obj } = this.props;

        if (tab_arr_obj) {
            let tabArrLength = tab_arr_obj.length;
            let tabIndex = null;
            let pageIndex = null;
            for (let i = 0; i < tabArrLength; i++) {
                if (interface_obj.tab_id === tab_arr_obj[i]._id) {
                    tabIndex = i;
                    break;
                }
            }
            const { page_arr_obj } = tab_arr_obj[tabIndex];
            for (let i = 0; i < tabArrLength; i++) {
                if (interface_obj.page_id === page_arr_obj[i]._id) {
                    pageIndex = i;
                    break;
                }
            }
            if (!page_arr_obj[pageIndex].panel_dimensions) {
                return;
            } else {
                return (
                    <SplitPane onChange={loTLHsave} className="width-w-nav" split="vertical" minSize={200} maxSize={-200} defaultSize={page_arr_obj[pageIndex].panel_dimensions.top_left_panel_height}>
                        <SplitPane onChange={loTLWsave} split="horizontal" minSize={200} maxSize={-200} defaultSize={page_arr_obj[pageIndex].panel_dimensions.top_left_panel_width}>
                            <div className="video-parent-panel"><Video /></div>
                            <div className="slides-container"><Slides /></div>
                        </SplitPane>
                        <div className="notes-parent-panel"><Notes /></div>
                    </SplitPane>
                )
            }
        } else {
            return <h2>Loading...</h2>
        }
    }
}

function mapStateToProps(state) {
    return {
        interface_obj: state.interface,
        binderObj: state.binder.binderObj
    }
}

export default connect(mapStateToProps, { setTopLeftHeight, setTopLeftWidth, updateBinderArray })(ThreePanel);