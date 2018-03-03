import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class VideoPlaylist extends Component {
  constructor(props) {
    super(props);
    this.interface_obj = null;
    this.binderId = null;
    this.tabId = null;
    this.pageId = null;
    this.videoId = null;
    this.currentVideoList = null;
  }
  deleteVideo(videoId) {
    this.props.removeVideoFromPlaylist(
      this.binderId,
      this.tabId,
      this.pageId,
      videoId
    );
  }
  componentWillReceiveProps(nextProps) {
    const { interface_obj } = this.props;
    if (this.props.binderObj !== nextProps.binderObj) {
      this.updatePlaylistComponent(nextProps);
    }
    if (interface_obj.page_id === nextProps.interface_obj.page_id) {
      this.updatePlaylistComponent(nextProps);
    }
  }
  updatePlaylistComponent(nextProps) {
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
      this.binderId = nextProps.binderObj._id;
      this.tabId = tab_arr_obj[tabIndex]._id;
      this.pageId = page_arr_obj[pageIndex]._id;
      this.currentVideoList = page_arr_obj[pageIndex].video._id;
    }
  }
  render() {
    const { playlistStyles } = this.props;
    const createPlaylist = this.props.playlistItems.map((item, index) => {
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
          {this.props.playlistItems ? createPlaylist : ''}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    playlistStyles: state.video.playlistStyles,
    playlistItems: state.video.addedVideo,
    interface_obj: state.interface,
    binderObj: state.binder.binderObj
  };
}

export default connect(mapStateToProps, actions)(VideoPlaylist);
