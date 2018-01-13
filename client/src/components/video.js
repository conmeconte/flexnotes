import React, { Component } from 'react';
import '../assets/css/video.css'
import axios from 'axios';
import { connect } from 'react-redux';
import Results from './results';
import VideoContainer from './video-container';
import { getResultStyles, getOpacityDisplay, toggleResults, getVideoResults } from '../actions';

const API_KEY = 'AIzaSyCGMjVZZ0fUy-XXyU7TTUCCZJUIosTjnXI';
class Video extends Component {
    search () {
        var ROOT_URL = 'https://www.googleapis.com/youtube/v3/search';
        var params = {
          part: 'snippet',
          key: API_KEY,
          q: 'javascript',
          type: 'video',
          maxResults: 50
        };
        var self = this;
        var videos = [];
        axios.get(ROOT_URL, { params: params })
          .then(function(response) {
              videos = [];
              const listOfVideoInfo = response.data.items;
              for (var listOfVideoInfoIndex = 0; listOfVideoInfoIndex < listOfVideoInfo.length; listOfVideoInfoIndex++) {
                  const vidObject = {
                      videoTitle: listOfVideoInfo[listOfVideoInfoIndex].snippet.title,
                      videoId: listOfVideoInfo[listOfVideoInfoIndex].id.videoId,
                      url: 'https://www.youtube.com/embed/' + listOfVideoInfo[listOfVideoInfoIndex].id.videoId,
                      description: listOfVideoInfo[listOfVideoInfoIndex].snippet.description,
                      channelTitle: listOfVideoInfo[listOfVideoInfoIndex].snippet.channelTitle,
                      channelId: listOfVideoInfo[listOfVideoInfoIndex].snippet.channelId,
                      thumbnails: listOfVideoInfo[listOfVideoInfoIndex].snippet.thumbnails
                  };
                  videos.push(vidObject);
              }
              console.log("VIDEO RESULTS: ", response);
              self.props.getVideoResults(videos);
          })
          .catch(function(error) {
            console.error(error);
          });
    }
    render() {
        return (
            <div className="main">
                <div style={this.props.opacityContainer} className="opacity"></div>
                <button id="search" className="btn btn-primary" onClick={ () => {
                    this.props.getResultStyles(this.props.resultsStyles, this.props.toggleResultsBool);
                    this.props.getOpacityDisplay(this.props.opacityContainer, this.props.toggleResultsBool);
                }}><span className="search glyphicon glyphicon-chevron-left"></span></button>
                <div style={this.props.resultsStyles} className="results-container sidebar col-xs-4 pull-right">
                    <div id="search-input-container" className="search-button-input input-group col-xs-12">
                        <input id="query" className="form-control" type="text" placeholder="Search..." />
                        <span className="input-group-btn">
                            <button id="search-button" type="button" className="btn btn-primary"
                                onClick={ () => { this.search() }}><span className="glyphicon glyphicon-search"></span></button>
                            <button className="btn btn-danger" onClick={ () => {
                    this.props.getResultStyles(this.props.resultsStyles, this.props.toggleResultsBool)
                    this.props.getOpacityDisplay(this.props.opacityContainer, this.props.toggleResultsBool)
                }}><span className="glyphicon glyphicon-chevron-right"></span></button>
                        </span>
                    </div>
                    <Results results={this.props.videoResults} />
                </div>
                <div id="video-wrapper" className="video-wrapper col-xs-11 pull-left">
                    <VideoContainer />
                </div>
            </div>
        );
    }
}

function mapStateToProps (state) {
    return {
        videoResults: state.video.results,
        playlist: state.video.videoList,
        resultsStyles: state.video.resultsStyles,
        opacityContainer: state.video.opacityDisplay,
        toggleResultsBool: state.video.toggleResults,
    }
}

export default connect(mapStateToProps, { getResultStyles, getOpacityDisplay, toggleResults, getVideoResults })(Video);