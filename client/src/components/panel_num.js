import React, { Component } from 'react';
import ThreePanel from './panel_three';
import FourPanel from './panel_four';

class PanelNum extends Component {

    render() {

        console.log("panel_num stuff: ", this.props.num);
        switch (this.props.num) {
            case 3:
                return <ThreePanel />
            case 4:
                return <FourPanel />
            default:
                return null;
        }
    }
}

export default PanelNum;