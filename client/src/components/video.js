import React, { Component } from 'react';
import '../assets/css/video.css'
import axios from 'axios';
import { connect } from 'react-redux';
import Results from './results';
import VideoContainer from './video-container';
import { getResultStyles, getOpacityDisplay, toggleResults, getVideoResults } from '../actions';
import { Field, reduxForm } from 'redux-form';
import VideoModal from './video-modal';

const API_KEY = 'AIzaSyCGMjVZZ0fUy-XXyU7TTUCCZJUIosTjnXI';
class Video extends Component {
    search (values) {
        console.log("VALUES FROM SEARCH: ", values);
        var ROOT_URL = 'https://www.googleapis.com/youtube/v3/search';
        var params = {
          part: 'snippet',
          key: API_KEY,
          q: values.video,
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
              self.props.getVideoResults(videos);
          })
          .catch(function(error) {
            console.error(error);
          });
    }
    renderInput ({input}) {
        console.log(input);
        return (    
            <input {...input} id="query" placeholder="Search..." className="form-control"/>
        )
    }
    render() {
        return (
            <div className="main">
                <VideoModal/>
                <div style={this.props.opacityContainer} className="opacity"></div>
                <button id="search" className="btn btn-primary" onClick={ () => {
                    this.props.getResultStyles(this.props.resultsStyles, this.props.toggleResultsBool);
                    this.props.getOpacityDisplay(this.props.opacityContainer, this.props.toggleResultsBool);
                }}><span className="search glyphicon glyphicon-chevron-left"></span></button>
                <div style={this.props.resultsStyles} className="results-container sidebar col-xs-4 pull-right">
                    <form onSubmit={this.props.handleSubmit(this.search.bind(this))} id="search-input-container" className="search-button-input input-group col-xs-12">
                        <Field name="video" component={this.renderInput} />
                        <span className="input-group-btn">
                            <button id="search-button" className="btn btn-primary">
                                <span className="glyphicon glyphicon-search"></span>
                            </button>
                            <button className="btn btn-danger" onClick={ () => {
                    this.props.getResultStyles(this.props.resultsStyles, this.props.toggleResultsBool)
                    this.props.getOpacityDisplay(this.props.opacityContainer, this.props.toggleResultsBool)
                }}><span className="glyphicon glyphicon-chevron-right"></span></button>
                        </span>
                    </form>
                    <Results results={this.props.videoResults} />
                </div>
                <div id="video-wrapper" className="video-wrapper col-xs-11 pull-left">
                    <VideoContainer />
                </div>
            </div>
        );
    }
}

Video = reduxForm({
    form: 'search-item'
})(Video);

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