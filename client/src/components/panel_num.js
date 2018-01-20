import React, { Component } from 'react';

import ThreePanel from './panel_three';
import FourPanel from './panel_four';

class PanelNum extends Component {

    render() {
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