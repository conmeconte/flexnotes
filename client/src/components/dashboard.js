import React, { Component } from 'react';
import Panel from './panel';
import NavBar from './navbar/navbar';
import Login from './login';
import Video from './video';
import Slides from './slides';
import Notes from './notes';

import { Link, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { getDataObject } from '../actions';

import Tour from 'reactour';
import steps from './react_tour_steps';

import '../assets/css/dashboard.css';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth,
      isTourOpen: false,
      mobilePanelIndex: 1
    }
    this.handleWindowSizeChange = this.handleWindowSizeChange.bind(this);
    this.mobileSelectComponent = this.mobileSelectComponent.bind(this);
  }
  componentWillMount() {
    this.props.getDataObject();

    this.setState({
      isTourOpen: false,
      width: window.innerWidth
    });

    this.toggleTour = this.toggleTour.bind(this);
    window.addEventListener('resize', this.handleWindowSizeChange);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange);
  }
  handleWindowSizeChange() {
    this.setState({ width: window.innerWidth });
  };
  toggleTour() {
    if (this.state.isTourOpen) {
      this.setState({
        isTourOpen: false
      });
    } else {
      this.setState({
        isTourOpen: true
      });
    }
  }

  mobileSelectComponent(index) {
    this.setState({
      mobilePanelIndex: index
    });
  }

  render() {
    const { width, mobilePanelIndex } = this.state;
    const isMobile = width <= 767;
    let dashboard = {};
    if (!this.props.binderArr) {
      return null;
    }
    if (isMobile) {
      let mobilePanel = {};
      switch (mobilePanelIndex) {
        case 1:
          mobilePanel = <NavBar />;
          break;
        case 2:
          mobilePanel = <Video />;
          break;
        case 3:
          mobilePanel = <Slides />;
          break;
        case 4:
          mobilePanel = <Notes />;
          break;
      }
      dashboard = (
        <div className="mobilePanel-container">
          {mobilePanel}
          <ul className="mobileNav">
            <li className="mobileLink navLink" onClick={() => this.mobileSelectComponent(1)}>
              <div className={`${(mobilePanelIndex === 1) ? 'activeMobile' : ''}`}>
                <i className="small material-icons">dehaze</i>
                <br />Nav
                </div>
            </li>
            <li className="mobileLink" onClick={() => this.mobileSelectComponent(2)}>
              <div className={`${(mobilePanelIndex === 2) ? 'activeMobile' : ''}`}>
                <i className="small material-icons mobile-icon">video_library</i>
                <br />Video
                </div>
            </li>
            <li className="mobileLink" onClick={() => this.mobileSelectComponent(3)}>
              <div className={`${(mobilePanelIndex === 3) ? 'activeMobile' : ''}`}>
                <i className="small material-icons mobile-icon">video_label</i>
                <br />Slides
                </div>
            </li>
            <li className="mobileLink" onClick={() => this.mobileSelectComponent(4)}>
              <div className={`${(mobilePanelIndex === 4) ? 'activeMobile' : ''}`}>
                <i className="small material-icons mobile-icon">description</i>
                <br />Notes
                </div>
            </li>
          </ul>
        </div>
      );
    } else {
      dashboard = (
        <div id="dashboard-container" className="row">
          <NavBar toggleTour={this.toggleTour} />
          <Panel />
          <Tour
            steps={steps}
            isOpen={this.state.isTourOpen}
            onRequestClose={this.toggleTour}
          />
        </div>
      );
    }

    return (
      <div>
        {dashboard}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    binderArr: state.binderArray.binderArr,
    interface: state.interface
  };
}

export default connect(mapStateToProps, { getDataObject })(Dashboard);
