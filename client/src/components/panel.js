import React, { Component } from 'react';
import ThreePanel from './panel_three';
import axios from 'axios';
import { connect } from 'react-redux';
import {
  setNumOfPanels,
  getPanelNum,
  updateBinderArray
} from '../actions/index';

class Panel extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <div
          className={`col panel_div ${this.props.interface_obj.navbar_min
            ? 's12'
            : 's10'}`}
        >
          <ThreePanel />
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
  };
}

export default connect(mapStateToProps, {
  setNumOfPanels,
  getPanelNum,
  updateBinderArray
})(Panel);
