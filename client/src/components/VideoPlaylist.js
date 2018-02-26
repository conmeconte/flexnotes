import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class VideoPlaylist extends Component {
  render() {
    const { playlistStyles } = this.props;
    let createPlaylist;
    if (this.props.playlistItems) {
      createPlaylist = this.props.playlistItems.map((item, index) => {
        if (!item.hasOwnProperty('videoId')) {
          return;
        }
        return (
          <li className="result-item collection-item col s12" key={index}>
            <div className="row list-item-wrap-container">
              <div className="row list-item-wrap-container col s10">
                <img src={item.videoImg} />
                <div className="col s10 video-contents">
                  <div>
                    <span>
                      {item.videoTitle}
                    </span>
                  </div>
                </div>
              </div>
              <button
                id="youtube-play"
                className="btn red darken-3 right video-btn"
                onClick={() => {
                  this.props.playVideo(item.videoId);
                  this.props.togglePlaylist(this.props.playlistStyles);
                }}
              >
                <i className="material-icons">play_arrow</i>
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
          <h4>Video Playlist</h4>
          {createPlaylist}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    playlistStyles: state.video.playlistStyles,
    playlistItems: state.video.addedVideo
  };
}

export default connect(mapStateToProps, actions)(VideoPlaylist);
