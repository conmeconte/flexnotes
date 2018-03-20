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
    const url = values['youtube-url'];
    var videoId;
    var videoLink;
    if (!url) {
      return;
    } else if (url.indexOf('player_embedded') !== -1) {
      videoId = url.split('=');
      videoId = videoId[2];
    } else if (url.indexOf('&feature=youtu.be') !== -1) {
      videoLink = url;
      videoId = videoLink.split('=');
      videoId = videoId[1].split('&');
      videoId = videoId[0];
    } else if (url.indexOf('feature') !== -1) {
      videoLink = url;
      videoId = videoLink.split('&');
      videoId = videoId[0].split('/');
      videoId = videoId[4];
      videoId = videoLink.split('&');
      videoId = videoLink[0];
    } else if (url.indexOf('&t') !== -1) {
      videoId = videoLink.split('&t');
      videoId = videoId[0].split('=');
      videoId = videoId[1];
    } else if (url.indexOf('&') !== -1 || url.indexOf('=') !== -1) {
      videoId = url;
      videoId = videoId.split('&')[0];
      videoId = videoId.split('=')[1];
    } else if (url.indexOf('youtu.be') !== -1) {
      videoId = url;
      videoId = url.split('/');
      videoId = videoId[3];
    } else {
      videoId = url;
    }
    this.props.playPastedLinkVideo(videoId);
    this.props.getSavedVideoImg(videoId).then(() => {
      this.props.getSavedVideoTitle(videoId).then(() => {
        this.props
          .addVideoToDatabase(
            videoId,
            this.props.savedVideoTitle,
            this.props.savedVideoImage,
            this.props.binderTabPageIds
          )
          .then(() => {
            this.props
              .getVideoPlaylist(
                this.props.binderId,
                this.props.tabId,
                this.props.pageId
              )
              .then(() => {
                this.props.setVideoUrl(
                  this.props.currentPlaylistItems[0].videoId
                );
              });
          });
      });
    });
  }

  deleteVideo(videoId) {
    this.props
      .removeVideoFromPlaylist(
        this.props.binderId,
        this.props.tabId,
        this.props.pageId,
        videoId
      )
      .then(() => {
        this.props
          .getVideoPlaylist(
            this.props.binderId,
            this.props.tabId,
            this.props.pageId
          )
          .then(() => {
            if (this.props.currentPlaylistItems.length > 0) {
              this.props.setVideoUrl(
                this.props.currentPlaylistItems[0].videoId
              );
            }
          });
      });
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
