import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import SplitPane from 'react-split-pane';
import _ from 'lodash';
import Video from './video';
import Notes from './notes';
import Slides from './slides';

class ThreePanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth
    };

    this.resizeBlocker = this.resizeBlocker.bind(this);
    this.resizeBlockerDisplayNone = this.resizeBlockerDisplayNone.bind(this);
  }
  componentDidMount() {
    const { width } = this.state;
    if (width > 767) {
      document
        .querySelector('.Resizer.vertical')
        .addEventListener('mousedown', this.resizeBlocker);
      document
        .querySelector('.Resizer.horizontal')
        .addEventListener('mousedown', this.resizeBlocker);
      document
        .querySelector('body')
        .addEventListener('mouseup', this.resizeBlockerDisplayNone);
    }
  }

  resizeBlocker() {
    document.querySelector('.resize-blocker').style.display = 'block';
    document.querySelector('.resize-blocker2').style.display = 'block';
  }

  resizeBlockerDisplayNone() {
    document.querySelector('.resize-blocker').style.display = 'none';
    document.querySelector('.resize-blocker2').style.display = 'none';
  }

  componentWillUnmount() {
    document
      .querySelector('.Resizer.vertical')
      .removeEventListener('mousedown', this.resizeBlocker);
    document
      .querySelector('.Resizer.horizontal')
      .removeEventListener('mousedown', this.resizeBlocker);
    document
      .querySelector('body')
      .removeEventListener('mouseup', this.resizeBlockerDisplayNone);
  }
  render() {
    const { width } = this.state;
    return (
      <SplitPane
        className={`width-w-nav ${this.props.interface_obj.navbar_min
          ? 'full_width'
          : ''}`}
        split="vertical"
        minSize={300}
        maxSize={1000}
        defaultSize={425}
        primary="second"
      >
        <SplitPane
          split="horizontal"
          minSize={50}
          maxSize={window.innerHeight - 50}
          defaultSize={450}
        >
          <div className="video-parent-panel">
            <Video />
          </div>
          <div className="slides-container">
            <Slides />
          </div>
        </SplitPane>
        <div className="notes-parent-panel">
          <Notes />
        </div>
      </SplitPane>
    );
  }
}

function mapStateToProps(state) {
  return {
    interface_obj: state.interface,
    binderObj: state.binder.binderObj
  };
}

export default connect(mapStateToProps, actions)(ThreePanel);
