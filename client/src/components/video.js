import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Results from './results';
import VideoContainer from './video-container';
import * as actions from '../actions';
import { Field, reduxForm } from 'redux-form';
import keys from '../../../config/keys';
class Video extends Component {
  search(values) {
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
    axios.get(ROOT_URL, { params: params }).then(response => {
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
          channelTitle: currentVideo.snippet.channelTitle,
          channelId: currentVideo.snippet.channelId,
          thumbnails: currentVideo.snippet.thumbnails
        };
        videos.push(vidObject);
      }
      this.props.getVideoResults(videos);
    });
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
        this.props.setVideoUrl('', interface_obj);
      } else {
        this.props.setVideoUrl(
          page_arr_obj[pageIndex].video[0].videoURL,
          interface_obj
        );
      }
    }
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.interface_obj.page_id !== nextProps.interface_obj.page_id) {
      this.updateVideoComponent(nextProps);
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
      if (
        pageIndex !== null &&
        page_arr_obj[pageIndex].hasOwnProperty('video') &&
        page_arr_obj[pageIndex].video[0].hasOwnProperty('videoId')
      ) {
        this.props.setVideoUrl(
          page_arr_obj[pageIndex].video[0].videoURL,
          interface_obj
        );
        this.props.slideOutVideoSearch(false, 'translateY(-119px)');
      } else {
        this.props.setVideoUrl('', interface_obj);
        this.props.slideOutVideoSearch(true, 'translateY(27px)');
      }
    }
  }
  render() {
    const { resultsVideoUrl } = this.props;
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
        <div id="video-wrapper" className="video-wrapper third-step">
          <VideoContainer />
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
    playlist: state.video.videoList,
    resultsStyles: state.video.resultsStyles,
    opacityContainer: state.video.opacityDisplay,
    toggleResultsBool: state.video.toggleResults,
    interface_obj: state.interface,
    binderObj: state.binder.binderObj,
    slideOutStyles: state.video.videoLinkSlideOut,
    toggleSlideOut: state.video.toggleSlideOut
  };
}

export default connect(mapStateToProps, actions)(Video);
