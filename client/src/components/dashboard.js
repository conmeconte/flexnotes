import React, { Component } from 'react';
import Panel from './panel';
import NavBar from './navbar/navbar';
import Login from './login';
import Video from './video';
import Slides from './slides';
import Notes from './notes';

import { Link, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { getDataObject, getVideoPlaylist, setVideoUrl } from '../actions';

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
    this.currentVideoList = null;
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
    // const { interface } = this.props;
    const { width } = this.state;
    const isMobile = width <= 767;
    if (isMobile) {
      if (this.props.binder !== nextProps.binder) {
        this.updatePlaylistComponent(nextProps);
      }
      if (this.props.interface.page_id !== nextProps.interface.page_id) {
        this.updatePlaylistComponent(nextProps);
      }
    }
  }
  updatePlaylistComponent(nextProps) {
    let { tab_arr_obj } = nextProps.binder.binderObj;
    // let { interface_obj } = nextProps;
    if (tab_arr_obj) {
      let tabArrLength = tab_arr_obj.length;
      let tabIndex = null;
      let pageIndex = null;
      for (let i = 0; i < tabArrLength; i++) {
        if (nextProps.interface.tab_id === tab_arr_obj[i]._id) {
          tabIndex = i;
          break;
        }
      }
      const { page_arr_obj } = tab_arr_obj[tabIndex];
      for (let i = 0; i < page_arr_obj.length; i++) {
        if (nextProps.interface.page_id === page_arr_obj[i]._id) {
          pageIndex = i;
          break;
        }
      }
      const currentPage = page_arr_obj[pageIndex];
      if (
        pageIndex !== null &&
        currentPage.hasOwnProperty('video') &&
        currentPage.video.length >= 1
      ) {
        this.binderId = nextProps.binder.binderObj._id;
        this.tabId = tab_arr_obj[tabIndex]._id;
        this.pageId = page_arr_obj[pageIndex]._id;
        this.props.getVideoPlaylist(this.binderId, this.tabId, this.pageId);
      }
    }
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
        style: { textAlign: 'center' }
      },
      {
        selector: '.second-step',
        content:
          'This is the navbar. It helps you organize your notes into binders, tabs and pages.',
        style: { textAlign: 'center', marginTop: '18em' }
      },
      {
        selector: '.navLink',
        content:
          'This is the menu. This will open the navbar so you can navigate through your binders, tabs and pages.',
        style: { textAlign: 'center', marginLeft: '1em' }
      },
      {
        selector: '.videoLink',
        content:
          'This opens your video panel where you can save class videos and search YouTube!',
        style: { textAlign: 'center', marginLeft: '11em' }
      },
      {
        selector: '.slideLink',
        content: 'You can access your class slides here.',
        style: { textAlign: 'center', marginLeft: '5em' }
      },
      {
        selector: '.notesLink',
        content: 'Your notes are found here.',
        style: { textAlign: 'center', marginLeft: '-3em' }
      },
      {
        selector: '.last-step',
        content: 'Happy note-taking!',
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
        <div className="mobilePanel-container">
          {mobilePanel}
          <ul className="mobileNav">
            <li
              className="mobileLink navLink"
              onClick={() => this.mobileSelectComponent(1)}
            >
              <div
                className={`${mobilePanelIndex === 1 ? 'activeMobile' : ''}`}
              >
                <i className="small material-icons">dehaze</i>
                <br />Menu
              </div>
            </li>
            <li
              className="mobileLink videoLink"
              onClick={() => {
                this.mobileSelectComponent(2);
                this.props.getVideoPlaylist(
                  this.binderId,
                  this.tabId,
                  this.pageId
                );
                // this.props.setVideoUrl(this.props.playlistItems[0].videoId);
              }}
            >
              <div
                className={`${mobilePanelIndex === 2 ? 'activeMobile' : ''}`}
              >
                <i className="small material-icons mobile-icon">
                  video_library
                </i>
                <br />Video
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
    interface: state.interface,
    playlistItems: state.video.addedVideo
  };
}

export default connect(mapStateToProps, {
  getDataObject,
  getVideoPlaylist,
  setVideoUrl
})(Dashboard);
