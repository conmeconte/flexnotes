import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Results extends Component {
  handlePlayVideo(videoUrl) {
    this.props.playVideo(videoUrl);
    this.props.addVideoToDatabase(videoUrl, '', this.props.interface_obj);
    this.props.slideOutVideoSearch(false, '');
  }
  render() {
    const { results } = this.props;
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
                this.handlePlayVideo(item.url);
              }}
            >
              <i className="material-icons">play_arrow</i>
            </button>
          </div>
        </li>
      );
    });
    return (
      <ul className="results collection">
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
