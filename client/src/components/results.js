import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alreadyExists: ''
    };
  }
  handlePlayVideo(videoId, videoTitle, videoImg, interfaceObj) {
    if (
      this.props.currentPlaylistItems !== undefined &&
      this.props.currentPlaylistItems.length !== 0
    ) {
      for (let i = 0; i < this.props.currentPlaylistItems.length; i++) {
        if (videoId === this.props.currentPlaylistItems[i].videoId) {
          document.querySelector('.results-container').scrollTop = 0;
          this.setState({
            alreadyExists: 'Sorry this video already exists.'
          });
          setTimeout(() => {
            this.setState({
              alreadyExists: ''
            });
          }, 2500);
          return;
        }
      }
    }
    this.props.slideOutVideoSearch(false);
    this.props.getResultStyles(false);
    this.props.playPastedLinkVideo(this.props.videoId);
    this.setState({
      alreadyExists: ''
    });
    this.props.playVideo(videoId);
    this.props
      .addVideoToDatabase(videoId, videoTitle, videoImg, interfaceObj)
      .then(() => {
        this.props.getVideoPlaylist(
          interfaceObj.binder_id,
          interfaceObj.tab_id,
          interfaceObj.page_id
        );
      });
  }
  render() {
    const { results } = this.props;
    const { alreadyExists } = this.state;
    const list = results.map((item, index) => {
      return (
        <li className="result-item collection-item col s12" key={index}>
          <div className="row list-item-wrap-container">
            <div className="row list-item-wrapper col s10">
              <img src={results[index].thumbnails.default.url} />
              <div className="col s10 video-contents">
                <div>
                  <span className="video-items">
                    {item.videoTitle}
                  </span>
                </div>
              </div>
            </div>
            <button
              id="youtube-play"
              className="btn red darken-3 right video-btn"
              onClick={() => {
                this.handlePlayVideo(
                  item.videoId,
                  item.videoTitle,
                  item.thumbnails.default.url,
                  this.props.interface_obj
                );
              }}
            >
              <i className="material-icons">add</i>
            </button>
          </div>
        </li>
      );
    });
    return (
      <ul className="results collection">
        <p className="red-text">
          {alreadyExists}
        </p>
        {list}
      </ul>
    );
  }
}

function mapStateToProps(state) {
  return {
    url: state.url,
    interface_obj: state.interface
  };
}

export default connect(mapStateToProps, actions)(Results);
