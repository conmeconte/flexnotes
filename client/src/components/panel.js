import React, { Component } from 'react';
import PanelNum from './panel_num';
import '../assets/css/panel.css';
import axios from 'axios';
// import { SortablePane, Pane } from 'react-sortable-pane';
// import Resizable from 're-resizable';
import { connect } from 'react-redux';
import { binderArray, setNumOfPanels } from '../actions/index';

class Panel extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        // console.log('props: ', props);

        // this.sendSize = this.sendSize.bind(this);
    }

    panelLayout(val) {
        // wait for Scott's answer on mapDispatchToProps for passing setNumOfPanels(val) to Action
    }

    componentWillMount() {
        this.props.getBinderArray();

        // const url = '/api/page';
        //
        // axios.get(url).then((resp) => {
        //     this.setState({
        //         userName: resp.data.userName
        //     })
        // });
    }

    // sendSize() {
    //     const { vertical_width, horizontal_left, horizontal_right } = this.state;
    //     console.log('vertical_width: ', vertical_width);
    //     console.log('horizontal_right: ', horizontal_right);
    //     console.log('horizontal_left: ', horizontal_left);
    //     //do an axios.post with these values ^
    // }

    render() {
        return (
            <div>
                <header>
                    <div>
                        <h3 className="welcome">Welcome {/*this.props.binderArray.binderArr.userName */}!</h3>
                    </div>
                    <div className="panelOptions">
                        <div><h3 className="optionsTitle">Panels:</h3></div>
                        <div><button className="layoutBtn" onClick={() => { this.panelLayout(3) }}>3</button></div>
                        <div><button className="layoutBtn" onClick={() => { this.panelLayout(4) }}>4</button></div>
                    </div>
                </header>
                {/* <div className="col-xs-10">
                    <button onClick={this.sendSize} className="btn btn-primary">Save</button>
                    <h1 className="app-title">FlexNote</h1>
                </div> */}
                <div className="panel_div col-xs-10">
                    <PanelNum num={/* wait for Scott's answer on mapDS for setNumOfPanels in Redux store*/}> />
                </div>
                </div>
                );
    }
}

function mapStateToProps(state) {
    return {
                    binderArray: state.binderArray
    }
}

function mapDispatchToProps(dispatch) {
    return {
                    getBinderArray: function () {
                    dispatch(binderArray())
                }
                }
}

const VisiblePanel = connect(mapStateToProps, mapDispatchToProps)(Panel);

export default VisiblePanel;