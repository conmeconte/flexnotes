import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../actions';

class VideoPlaylist extends Component {
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
  deleteVideo(videoId) {
    this.props.removeVideoFromPlaylist(
      this.props.binderId,
      this.props.tabId,
      this.props.pageId,
      videoId
    );
  }
  render() {
    const { playlistStyles } = this.props;
    let createPlaylist = '';
    if (this.props.currentPlaylistItems.length !== 0) {
      createPlaylist = this.props.currentPlaylistItems.map((item, index) => {
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
          {this.props.currentPlaylistItems.length >= 1 &&
          this.props.currentPlaylistItems[0].videoId !== undefined
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
    savedVideoImage: state.video.savedVideoImage
  };
}

export default connect(mapStateToProps, actions)(VideoPlaylist);
