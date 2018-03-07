import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../actions';

class VideoContainer extends Component {
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
  render() {
    console.log(this.props.videoLink);
    return (
      <div className="iframe-wrapper">
        <form
          onSubmit={this.props.handleSubmit(this.handleYouTubeUrl.bind(this))}
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
            this.props.slideOutVideoSearch(
              this.props.toggleSlideOut,
              this.props.slideOutStyles
            );
          }}
        >
          {!this.props.toggleSlideOut
            ? <i className="material-icons">keyboard_arrow_up</i>
            : <i className="material-icons">keyboard_arrow_down</i>}
        </div>
        <div id="video-container" className="video-container">
          <div className="resize-blocker" />
          {this.props.currentPlaylistItems.length >= 1 &&
          this.props.currentPlaylistItems[0].videoId !== undefined
            ? <iframe
                allowFullScreen
                id="video-iframe"
                src={this.props.videoLink}
                className="video-iframe"
              />
            : 'No video available. Please add one through a Youtube search or paste a valid link.'}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    binderTabPageIds: state.interface,
    resultsStyles: state.video.resultsStyles,
    toggleResultsBool: state.video.toggleResults,
    opacityContainer: state.video.opacityDisplay,
    slideOutStyles: state.video.videoLinkSlideOut,
    toggleSlideOut: state.video.toggleSlideOut,
    savedVideoTitle: state.video.savedVideoTitle,
    savedVideoImage: state.video.savedVideoImage,
    playlistStyles: state.video.playlistStyles,
    videoLink: state.video.videoLink
  };
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

export default connect(mapStateToProps, actions)(VideoContainer);
