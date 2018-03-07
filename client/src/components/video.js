import React, { Component } from 'react';
import Results from './Results';
import VideoContainer from './VideoContainer';
import VideoPlaylist from './VideoPlaylist';
import axios from 'axios';
import * as actions from '../actions';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import keys from '../../../config/keys';
class Video extends Component {
  constructor(props) {
    super(props);
    this.interface_obj = null;
    this.binderId = null;
    this.tabId = null;
    this.pageId = null;
    this.currentVideoList = null;
    this.currentPlaylistItems = [];
  }
  async search(values) {
    if (!values.video) {
      return;
    }
    const ROOT_URL = 'https://www.googleapis.com/youtube/v3/search';
    const params = {
      part: 'snippet',
      key: keys.videoKey,
      q: values.video,
      type: 'video',
      maxResults: 50,
      playerVars: { rel: 0 }
    };
    let videos = [];
    const response = await axios.get(ROOT_URL, { params: params });
    videos = [];
    const listOfVideoInfo = response.data.items;
    for (
      let listOfVideoInfoIndex = 0;
      listOfVideoInfoIndex < listOfVideoInfo.length;
      listOfVideoInfoIndex++
    ) {
      const currentVideo = listOfVideoInfo[listOfVideoInfoIndex];
      const vidObject = {
        videoTitle: currentVideo.snippet.title,
        videoId: currentVideo.id.videoId,
        url: `https://www.youtube.com/embed/${currentVideo.id.videoId}`,
        description: currentVideo.snippet.description,
        channelId: currentVideo.snippet.channelId,
        thumbnails: currentVideo.snippet.thumbnails
      };
      videos.push(vidObject);
    }
    this.props.getVideoResults(videos);
  }
  componentWillMount() {
    let { tab_arr_obj } = this.props.binderObj;
    let { interface_obj } = this.props;
    if (tab_arr_obj) {
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
      if (
        typeof page_arr_obj[pageIndex].video[0].videoURL === 'undefined' ||
        typeof page_arr_obj[pageIndex].video[0].videoURL === ''
      ) {
        // return;
        this.props.setVideoUrl('', interface_obj);
      } else {
        this.props.setVideoUrl(
          page_arr_obj[pageIndex].video[0].videoId,
          interface_obj
        );
      }
    }
  }
  shouldComponentUpdate() {
    this.props.updateBinderArray();
    return true;
  }
  componentWillReceiveProps(nextProps) {
    const { interface_obj } = this.props;
    if (interface_obj.page_id !== nextProps.interface_obj.page_id) {
      this.updateVideoComponent(nextProps);
    }
  }
  updateVideoComponent(nextProps) {
    let { tab_arr_obj } = nextProps.binderObj;
    let { interface_obj } = nextProps;
    if (tab_arr_obj) {
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
      const currentPage = page_arr_obj[pageIndex];

      if (
        pageIndex !== null &&
        currentPage.hasOwnProperty('video') &&
        currentPage.video.length >= 1
      ) {
        this.props.setVideoUrl(currentPage.video[0].videoId, interface_obj);
        this.props.slideOutVideoSearch(false, 'translateY(-119px)');
        // this.props.setVideoPlaylist(currentPage.video);
        this.binderId = nextProps.binderObj._id;
        this.tabId = tab_arr_obj[tabIndex]._id;
        this.pageId = page_arr_obj[pageIndex]._id;
        this.currentVideoList = page_arr_obj[pageIndex].video._id;
        this.currentPlaylistItems = page_arr_obj[pageIndex].video;
        this.props.getVideoPlaylist(this.binderId, this.tabId, this.pageId);
      } else {
        this.props.setVideoUrl('', interface_obj);
        this.props.slideOutVideoSearch(true, 'translateY(27px)');
      }
    }
  }
  renderInput({ input }) {
    return (
      <div id="input-field" className="col s12 input-field">
        <input
          type="text"
          {...input}
          id="query"
          placeholder="Search and save from Youtube Search.."
          className="form-control"
        />
      </div>
    );
  }
  render() {
    const { resultsVideoUrl, playlistStyles } = this.props;
    return (
      <div className="main">
        <div
          style={this.props.resultsStyles}
          className="results-container sidebar"
        >
          <div className="row btn-wrapper">
            <form
              onSubmit={this.props.handleSubmit(this.search.bind(this))}
              id="search-input-container"
              className="search-button-input"
            >
              <Field
                name="video"
                defaultValue={resultsVideoUrl}
                component={this.renderInput}
              />
              <span className="input-group-btn btn-wrapper">
                <button
                  id="search-button"
                  className="btn results-btn video-btn red darken-3"
                >
                  <i className="material-icons">search</i>
                </button>

                <button
                  className="btn results-btn vid-right-arrow video-btn"
                  onClick={() => {
                    this.props.getResultStyles(
                      this.props.resultsStyles,
                      this.props.toggleResultsBool
                    );
                    this.props.getOpacityDisplay(
                      this.props.opacityContainer,
                      this.props.toggleResultsBool
                    );
                  }}
                >
                  <i className="material-icons">close</i>
                </button>
              </span>
            </form>
          </div>
          <div className="row">
            <Results results={this.props.videoResults} />
          </div>
        </div>
        <VideoPlaylist
          binderId={this.binderId}
          tabId={this.tabId}
          pageId={this.pageId}
          currentPlaylistItems={this.props.playlistItems}
        />
        <div id="video-wrapper" className="video-wrapper third-step">
          <VideoContainer currentPlaylistItems={this.props.playlistItems} />
        </div>
      </div>
    );
  }
}

Video = reduxForm({
  form: 'search-item'
})(Video);

function mapStateToProps(state) {
  return {
    pastedVideoUrl: state.videoResults.videoLink,
    videoResults: state.video.results,
    resultsStyles: state.video.resultsStyles,
    opacityContainer: state.video.opacityDisplay,
    toggleResultsBool: state.video.toggleResults,
    interface_obj: state.interface,
    binderObj: state.binder.binderObj,
    slideOutStyles: state.video.videoLinkSlideOut,
    toggleSlideOut: state.video.toggleSlideOut,
    playlistStyles: state.video.playlistStyles,
    playlistItems: state.video.addedVideo,
    videoLink: state.video.videoLink
  };
}

export default connect(mapStateToProps, actions)(Video);
