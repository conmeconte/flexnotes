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

import '../assets/css/dashboard.css';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth,
      isTourOpen: false,
      mobilePanelIndex: 1
    };

    this.handleWindowSizeChange = this.handleWindowSizeChange.bind(this);
    this.mobileSelectComponent = this.mobileSelectComponent.bind(this);
    this.toggleTour = this.toggleTour.bind(this);
    this.binderId = null;
    this.tabId = null;
    this.pageId = null;
  }

  componentWillMount() {
    this.props.getDataObject();

    this.setState({
      isTourOpen: false,
      width: window.innerWidth
    });
    window.addEventListener('resize', this.handleWindowSizeChange);
  }
  componentWillReceiveProps(nextProps) {
    const { width } = this.state;
    const isMobile = width <= 767;
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange);
  }

  handleWindowSizeChange() {
    this.setState({ width: window.innerWidth });
  }

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

    const desktopSteps = [
      {
        selector: '.first-step',
        content: 'Welcome to FlexNotes!',
        style: { textAlign: 'center' }
      },
      {
        selector: '.second-step',
        content:
          'This is the navbar. You can organize your notes into binders, tabs and pages.',
        style: { textAlign: 'center', marginTop: '30px' }
      },
      {
        selector: '.third-step',
        content:
          'You can save class videos here. Just paste the url address and save. You can also search YouTube!',
        style: { textAlign: 'center', marginTop: '30px' }
      },
      {
        selector: '.fourth-step',
        content:
          'You can save class slides here. Just paste the url address and save.',
        style: { textAlign: 'center' }
      },
      {
        selector: '.fifth-step',
        content: 'You can take notes here.',
        style: { textAlign: 'center' }
      },
      {
        selector: '.sixth-step',
        content:
          'You can style your notes with the toolbar. It also allows you to add links and images.',
        style: { textAlign: 'center' }
      },
      {
        selector: '.last-step',
        content: 'Happy note-taking!',
        style: { textAlign: 'center' }
      }
    ];

    const mobileSteps = [
      {
        selector: '.first-step',
        content: 'Welcome to FlexNotes!',
        position: 'center',
        style: { textAlign: 'center' }
      },
      {
        selector: '.second-step',
        content:
          'This is the navbar. It helps you organize your notes into binders, tabs and pages.',
        position: 'center',
        style: { textAlign: 'center' }
      },
      {
        selector: '.navLink',
        content:
          'This opens your binders. It will help you navigate through them, their tabs and their pages.',
        position: 'center',
        style: { textAlign: 'center', marginTop: '15em' }
      },
      {
        selector: '.videoLink',
        content:
          'This opens your video panel where you can save class videos and search YouTube!',
        position: 'center',
        style: { textAlign: 'center', marginTop: '15em' }
      },
      {
        selector: '.slideLink',
        content: 'You can access your class slides here.',
        position: 'center',
        style: { textAlign: 'center', marginTop: '15em' }
      },
      {
        selector: '.notesLink',
        content: 'Your notes are found here.',
        position: 'center',
        style: { textAlign: 'center', marginTop: '15em' }
      },
      {
        selector: '.last-step',
        content: 'Happy note-taking!',
        position: 'center',
        style: { textAlign: 'center' }
      }
    ];

    if (isMobile) {
      let mobilePanel = {};
      switch (mobilePanelIndex) {
        case 1:
          mobilePanel = <NavBar mobile={true} toggleTour={this.toggleTour} />;
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
        <div className="mobilePanel-container mobilePanel-container-safari">
          {mobilePanel}
          <ul className="mobileNav">
            <li
              className="mobileLink navLink"
              onClick={() => this.mobileSelectComponent(1)}
            >
              <div
                className={`${mobilePanelIndex === 1 ? 'activeMobile' : ''}`}
              >
                <i className="small material-icons">storage</i>
                <br />Binders
              </div>
            </li>
            <li
              className="mobileLink videoLink"
              onClick={() => {
                this.mobileSelectComponent(2);
              }}
            >
              <div
                className={`${mobilePanelIndex === 2 ? 'activeMobile' : ''}`}
              >
                <i className="small material-icons mobile-icon">
                  video_library
                </i>
                <br />Videos
              </div>
            </li>
            <li
              className="mobileLink slideLink"
              onClick={() => this.mobileSelectComponent(3)}
            >
              <div
                className={`${mobilePanelIndex === 3 ? 'activeMobile' : ''}`}
              >
                <i className="small material-icons mobile-icon">video_label</i>
                <br />Slides
              </div>
            </li>
            <li
              className="mobileLink notesLink"
              onClick={() => this.mobileSelectComponent(4)}
            >
              <div
                className={`${mobilePanelIndex === 4 ? 'activeMobile' : ''}`}
              >
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
          <NavBar toggleTour={this.toggleTour} mobile={false} />
          <Panel />
        </div>
      );
    }

    return (
      <div>
        {dashboard}
        <Tour
          startAt={0}
          steps={isMobile ? mobileSteps : desktopSteps}
          isOpen={this.state.isTourOpen}
          onRequestClose={this.toggleTour}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    binderArr: state.binderArray.binderArr,
    binder: state.binder,
    interface: state.interface
  };
}

export default connect(mapStateToProps, {
  getDataObject
})(Dashboard);
