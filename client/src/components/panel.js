import React, { Component } from 'react';
import PanelNum from './panel_num';
import '../assets/css/panel.css';
import axios from 'axios';
// import { SortablePane, Pane } from 'react-sortable-pane';
// import Resizable from 're-resizable';
import {connect} from 'react-redux';
import {binderArray} from '../actions/index';

class Panel extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        // console.log('props: ', props);
        this.state = {
            panelNum: ""
        };
        // this.sendSize = this.sendSize.bind(this);
    }

    panelLayout(val) {
        this.setState({
            panelNum: val
        });
    }

    componentWillMount(){
        //this.props.getBinderArray();

        // const url = '/api/page';
        //
        // axios.get(url).then((resp) => {
        //     this.setState({
        //         userName: resp.data.userName
        //     })
        // });
    }


    // logVWsize(panelSize) {
    //     console.log("vw size: ", panelSize);

    //     const { vertical_width } = this.state;
    //     this.setState({
    //         vertical_width: panelSize
    //     });
    // }

    // logHLsize(panelSize) {
    //     console.log("hl size: ", panelSize);

    //     const { horizontal_left } = this.state;
    //     this.setState({
    //         horizontal_left: panelSize
    //     });
    // }

    // logHRsize(panelSize) {
    //     console.log("hr size: ", panelSize);

    //     const { horizontal_right } = this.state;
    //     this.setState({
    //         horizontal_right: panelSize
    //     });
    // }

    // sendSize() {
    //     const { vertical_width, horizontal_left, horizontal_right } = this.state;
    //     console.log('vertical_width: ', vertical_width);
    //     console.log('horizontal_right: ', horizontal_right);
    //     console.log('horizontal_left: ', horizontal_left);
    //     //do an axios.post with these values ^
    // }

    render() {
        // const { vertical_width, horizontal_left, horizontal_right } = this.state;

        // from below video-parent-panel

        /* TO SAVE SIZES */
        // Ternaries or Conditional statements required for each parent SplitPane component for *onChange prop* and *defaultSize prop* (which will be grabbed from state)
        //      ^ This will require dependendcy on *split prop*

        /*FOUR PANEL */
        // <SplitPane className="width-w-nav" onChange={size => this.logVWsize(size)} split="vertical" minSize={200} maxSize={-200} defaultSize={vertical_width}>
        // <SplitPane onChange={size => this.logHLsize(size)} split="horizontal" minSize={200} maxSize={-200} defaultSize={horizontal_left}>
        //     <div className="slides-container"><Slides /></div>
        //     <div className="notes-parent-panel"><Notes /></div>
        // </SplitPane>
        //     <SplitPane onChange={size => this.logHRsize(size)} split="horizontal" minSize={200} maxSize={-200} defaultSize={horizontal_right}>
        //         <div className="video-parent-panel"><Video /></div>
        //         <div>MeisterTask</div>
        //     </SplitPane>
        return (
            <div>
                <header>
                    <div>
                        <h3 className="welcome">Welcome {this.props.binderArray.binderArr.userName}!</h3>
                    </div>
                    <div className="panelOptions">
                        <div><h3 className="optionsTitle">Panels:</h3></div>
                        <div><button className="layoutBtn" onClick={() => { this.panelLayout("3") }}>3</button></div>
                        <div><button className="layoutBtn" onClick={() => { this.panelLayout("4") }}>4</button></div>
                    </div>
                </header>
                {/* <div className="col-xs-10">
                    <button onClick={this.sendSize} className="btn btn-primary">Save</button>
                    <h1 className="app-title">FlexNote</h1>
                </div> */}
                <div className="panel_div col-xs-10">
                    <PanelNum num={this.state.panelNum} />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        binderArray: state.binderArray
    }
}

function mapDispatchToProps(dispatch){
    return {
        getBinderArray: function(){
            dispatch(binderArray())
        }
    }
}

const VisiblePanel = connect(mapStateToProps, mapDispatchToProps)(
    Panel
);

export default VisiblePanel;