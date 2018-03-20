import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../actions';

class VideoPlaylist extends Component {
  constructor(props) {
    super(props);
    this.deleteVideo = this.deleteVideo.bind(this);
  }
  renderInput({ input, type, meta: { error, touched } }) {
    return (
      <div className="col s9 input-field">
        <input
          {...input}
          className="pastedVideoInput video-playlist-input"
          type={type}
          placeholder="Paste and Save a Youtube video URL..."
          value={input.value}
        />
        <p className="red-text">
          <em>
            {touched && error ? error : ''}
          </em>
        </p>
      </div>
    );
  }
  handleYouTubeUrl(values) {
    const youtubeLinkInput = values['youtube-url'];
    if (!youtubeLinkInput || youtubeLinkInput.indexOf('youtu') === -1) {
      return;
    }
    this.props.playPastedLinkVideo(values['youtube-url']);
    this.props.getSavedVideoImg(values['youtube-url']).then(() => {
      this.props.getSavedVideoTitle(values['youtube-url']).then(() => {
        this.props.addVideoToDatabase(
          values['youtube-url'],
          this.props.savedVideoTitle,
          this.props.savedVideoImage,
          this.props.binderTabPageIds
        );
      });
    });
  }
  componentWillReceiveProps(nextProps) {
    this.updateVideoComponent(nextProps);
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
      this.binderId = nextProps.binderObj._id;
      this.tabId = tab_arr_obj[tabIndex]._id;
      this.pageId = page_arr_obj[pageIndex]._id;
      this.props.getVideoPlaylist(this.binderId, this.tabId, this.pageId);
      // .then(() => {
      //   if (this.props.playlistItems.length > 0) {
      //     this.props.setVideoUrl(this.props.playlistItems[0].videoId);
      //   }
      // });
    }
  }
  deleteVideo(videoId) {
    this.props.removeVideoFromPlaylist(
      this.props.binderId,
      this.props.tabId,
      this.props.pageId,
      videoId
    );
    this.props
      .getVideoPlaylist(this.binderId, this.tabId, this.pageId)
      .then(() => {
        if (this.props.playlistItems.length > 0) {
          this.props.setVideoUrl(this.props.playlistItems[0].videoId);
        }
      });
  }
  render() {
    const { playlistStyles } = this.props;
    let createPlaylist = '';
    if (this.props.playlistItems.length !== 0) {
      createPlaylist = this.props.playlistItems.map((item, index) => {
        if (!item.hasOwnProperty('videoId')) {
          return;
        }
        return (
          <li className="result-item collection-item col s12" key={index}>
            <div className="row list-item-wrap-container">
              <div className="row list-item-wrap-container col s12">
                <img src={item.videoImg} />
                <div className="col s9 video-contents">
                  {item.videoTitle}
                </div>
              </div>
              <button
                className="btn btn-small playlist-play col s1 playlist-play"
                onClick={() => {
                  this.props.playVideo(item.videoId);
                  this.props.setVideoUrl(item.videoId);
                  this.props.togglePlaylist(this.props.playlistStyles);
                }}
              >
                <i className="material-icons">play_arrow</i>
              </button>
              <button
                onClick={() => {
                  this.deleteVideo(item._id);
                }}
                className="btn btn-small playlist-delete col s1"
              >
                <i className="material-icons">delete_forever</i>
              </button>
            </div>
          </li>
        );
      });
    }

    return (
      <div style={playlistStyles} className="video-playlist-panel">
        <i
          onClick={() => {
            this.props.togglePlaylist(this.props.playlistStyles);
          }}
          className="material-icons close-playlist-icon close-playlist"
        >
          close
        </i>
        <ul className="video-playlist collection">
          <form
            onSubmit={this.props.handleSubmit(this.handleYouTubeUrl.bind(this))}
            style={this.props.slideOutStyles}
            className="row"
          >
            <h5 className="video-playlist-title">Video Playlist</h5>
            <Field name="youtube-url" component={this.renderInput} />
            <div className="col s3 youtube-search-buttons">
              <div className="row btn-wrapper">
                <button className="btn green darken-1 video-btn">
                  <i className="material-icons">add</i>
                </button>
              </div>
            </div>
          </form>
          {this.props.playlistItems.length >= 1 &&
          this.props.playlistItems[0].videoId !== undefined
            ? createPlaylist
            : <div className="no-videos">
                Currently, no videos on playlist. Please add a video by pasting
                a link or saving through a video search.
              </div>}
        </ul>
      </div>
    );
  }
}

function validate(values) {
  const error = {};
  const youtubeLinkValue = values['youtube-url'];
  if (youtubeLinkValue) {
    if (youtubeLinkValue.indexOf('youtu') === -1) {
      error['youtube-url'] = 'Please paste a valid YouTube URL';
    }
  }
  return error;
}

VideoPlaylist = reduxForm({
  form: 'youtube-url',
  validate
})(VideoPlaylist);

function mapStateToProps(state) {
  return {
    playlistStyles: state.video.playlistStyles,
    interface_obj: state.interface,
    binderObj: state.binder.binderObj,
    binderTabPageIds: state.interface,
    savedVideoTitle: state.video.savedVideoTitle,
    savedVideoImage: state.video.savedVideoImage,
    playlistItems: state.video.addedVideo
  };
}

export default connect(mapStateToProps, actions)(VideoPlaylist);
