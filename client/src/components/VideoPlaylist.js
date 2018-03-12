import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class VideoPlaylist extends Component {
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
          <h4>Video Playlist</h4>
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

function mapStateToProps(state) {
  return {
    playlistStyles: state.video.playlistStyles,
    interface_obj: state.interface,
    binderObj: state.binder.binderObj
  };
}

export default connect(mapStateToProps, actions)(VideoPlaylist);
