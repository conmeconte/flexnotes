import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../actions';

class VideoContainer extends Component {
  constructor(props) {
    super(props);
    this.currentVideoList = this.props.currentPlaylistItems;
  }

  renderInput({ input, type, meta: { error, touched } }) {
    return (
      <div className="col s8 input-field">
        <input
          {...input}
          className="pastedVideoInput"
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
  handleVideoInput(values) {
    this.props.handleYouTubeUrl(values).then(() => {
      this.props.playPastedLinkVideo(this.props.videoId);
      this.props.getSavedVideoImg(this.props.videoId).then(() => {
        this.props.getSavedVideoTitle(this.props.videoId).then(() => {
          this.props
            .addVideoToDatabase(
              this.props.videoId,
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
    });

    this.props.reset();
    this.props.slideOutVideoSearch(false);
  }

  render() {
    return (
      <div className="iframe-wrapper">
        <form
          onSubmit={this.props.handleSubmit(this.handleVideoInput.bind(this))}
          style={this.props.slideOutStyles}
          className="row video-slide-out-input slide-out-input"
        >
          <Field name="youtube-url" component={this.renderInput} />
          <div className="col s3 youtube-search-buttons">
            <div className="row btn-wrapper">
              <button className="btn green darken-1 video-btn">
                <i className="material-icons">add</i>
              </button>
              <button
                type="button"
                className="btn vidList vid-left-arrow video-btn"
                onClick={() => {
                  this.props.getResultStyles(this.props.toggleResultsBool);
                }}
              >
                <i className="fa fa-youtube" aria-hidden="true" />
              </button>
            </div>
          </div>
        </form>
        <div
          onClick={() => {
            this.props.togglePlaylist(this.props.playlistStyles.transform);
          }}
          className="playlist-logo-container"
        >
          <i className="material-icons">featured_play_list</i>
        </div>
        <div
          className="arrow-container"
          onClick={() => {
            this.props.slideOutVideoSearch(this.props.toggleSlideOut);
          }}
        >
          {!this.props.toggleSlideOut
            ? <i className="material-icons">remove</i>
            : <i className="material-icons">add</i>}
        </div>
        <div
          id="video-container"
          className="video-container video-container-safari"
        >
          <div className="resize-blocker" />
          {this.props.currentPlaylistItems.length >= 1 &&
          this.props.currentPlaylistItems[0].videoId !== undefined
            ? <iframe
                allowFullScreen
                id="video-iframe"
                src={this.props.videoLink}
                className="video-iframe"
              />
            : <div className="no-videos">
                Currently, no videos on playlist. Please add a video by pasting
                a link or saving through a video search.
              </div>}
        </div>
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

VideoContainer = reduxForm({
  form: 'youtube-url',
  validate
})(VideoContainer);

function mapStateToProps(state) {
  return {
    binderTabPageIds: state.interface,
    toggleResultsBool: state.video.toggleResults,
    slideOutStyles: state.video.videoLinkSlideOut,
    toggleSlideOut: state.video.toggleSlideOut,
    savedVideoTitle: state.video.savedVideoTitle,
    savedVideoImage: state.video.savedVideoImage,
    playlistStyles: state.video.playlistStyles,
    videoLink: state.video.videoLink,
    videoId: state.video.videoId
  };
}

export default connect(mapStateToProps, actions)(VideoContainer);
