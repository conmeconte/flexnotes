import React, { Component } from 'react';
import PanelNum from './panel_num';
// import '../assets/css/panel.css';
import axios from 'axios';
// import { SortablePane, Pane } from 'react-sortable-pane';
// import Resizable from 're-resizable';
import { connect } from 'react-redux';
import { setNumOfPanels, updateBinderArray } from '../actions/index';


class Panel extends Component {
    constructor(props) {
        super(props);
        //this.props = props;
    }

    // componentWillReceiveProps(nextProps) {
    //     console.log('cw r p panel.js', nextProps.interface_obj.sent_to_db)
    //     if (nextProps.interface_obj.sent_to_db) {
    //         this.props.updateBinderArray();
    //     } else {
    //         let { tab_arr_obj } = nextProps.binderObj;
    //         let { interface_obj } = nextProps;

    //         if (tab_arr_obj) {
    //             let tabArrLength = tab_arr_obj.length;
    //             let tabIndex = null;
    //             let pageIndex = null;
    //             for (let i = 0; i < tabArrLength; i++) {
    //                 if (interface_obj.tab_id === tab_arr_obj[i]._id) {
    //                     tabIndex = i;
    //                     break;
    //                 }
    //             }
    //             const { page_arr_obj } = tab_arr_obj[tabIndex];
    //             for (let i = 0; i < tabArrLength; i++) {
    //                 if (interface_obj.page_id === page_arr_obj[i]._id) {
    //                     pageIndex = i;
    //                     break;
    //                 }
    //             }
    //             if (!page_arr_obj[pageIndex].panel_dimensions.number_of_panels) {
    //                 return;
    //             } else {
    //                 console.log('cwm panel component recieving new props');
    //                 console.log('cwm panel setting panels to', page_arr_obj[pageIndex].panel_dimensions.number_of_panels)
    //                 // this.props.setNumOfPanels(page_arr_obj[pageIndex].panel_dimensions.number_of_panels, interface_obj);
    //             }
    //         } else {
    //             console.log("DOES NOT WORK");
    //         }
    //     }
    // }

    componentWillReceiveProps(nextProps) {

        if (nextProps.binderObj !== this.props.binderObj) {
            let { tab_arr_obj } = nextProps.binderObj;
            let { interface_obj } = nextProps;
            if (tab_arr_obj) {
                console.log('cwrp panel.js tab arr obj:', tab_arr_obj);
                console.log('cwro panel.js interface obj:', interface_obj);
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
                for (let i = 0; i < page_arr_obj.length; i++) {
                    if (interface_obj.page_id === page_arr_obj[i]._id) {
                        pageIndex = i;
                        break;
                    }
                }
                if (page_arr_obj[pageIndex].hasOwnProperty('panel_dimensions')) {
                    return;
                } else {
                    console.log('cwm panel component mounting');
                    console.log('cwm panel setting panels to', page_arr_obj[pageIndex].panel_dimensions.number_of_panels)
                    this.props.setNumOfPanels(page_arr_obj[pageIndex].panel_dimensions.number_of_panels, interface_obj);
                }
            } else {
                console.log("DOES NOT WORK");
            }

        } else {
            return;
        }
    }

    render() {
        console.log("panel props", this.props);
        return (
            <div className="col s10">
                {/* <header>
                    <div>
                        <h3 className="welcome">FlexNotes{this.props.binderArray.binderArr.userName}</h3>
                    </div>
                    <div className="panelOptions">
                        <div><h3 className="optionsTitle">Panels:</h3></div>
                        <div><button className="layoutBtn" onClick={() => { this.props.setNumOfPanels(3, this.props.interface_obj) }}>View Dashboard</button></div>
                        <div><button className="layoutBtn" onClick={() => { this.props.setNumOfPanels(4, this.props.interface_obj) }}>4</button></div>
                    </div>
                </header> */}
                {/* <div className="col-xs-10">
                    <button onClick={this.sendSize} className="btn btn-primary">Save</button>
                    <h1 className="app-title">FlexNote</h1>
                </div> */}
                <div className="panel_div col s10">
                    <PanelNum num={this.props.panel_num} />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        panel_num: state.panelSpecs.numberPanels,
        interface_obj: state.interface,
        binderObj: state.binder.binderObj
    }
}


export default connect(mapStateToProps, { setNumOfPanels, updateBinderArray })(Panel);;