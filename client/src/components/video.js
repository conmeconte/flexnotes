import React, { Component } from 'react';
// import '../assets/css/video.css'
import axios from 'axios';
import { connect } from 'react-redux';
import Results from './results';
import VideoContainer from './video-container';
import { getResultStyles, getOpacityDisplay, toggleResults, getVideoResults, setVideoUrl, updateBinderArray, getDataObject, slideOutVideoSearch } from '../actions';
import { Field, reduxForm } from 'redux-form';
import VideoModal from './video-modal';

const API_KEY = 'AIzaSyCGMjVZZ0fUy-XXyU7TTUCCZJUIosTjnXI';
class Video extends Component {
    search(values) {
        if (!values.video) {
            return;
        }
        console.log("VALUES FROM SEARCH: ", values);
        var ROOT_URL = 'https://www.googleapis.com/youtube/v3/search';
        var params = {
            part: 'snippet',
            key: API_KEY,
            q: values.video,
            type: 'video',
            maxResults: 50,
            playerVars: { rel: 0 }
        };
        var self = this;
        var videos = [];
        axios.get(ROOT_URL, { params: params })
            .then(function (response) {
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
            .catch(function (error) {
                console.error(error);
            });
    }
    componentWillMount() {
        let { tab_arr_obj } = this.props.binderObj;
        let { interface_obj } = this.props;
        if (tab_arr_obj) {
            let tabArrLength = tab_arr_obj.length;
            let tabIndex = null;
            let pageIndex = null;
            for (let i = 0; i < tabArrLength; i++) {
                if (interface_obj.tab_id === tab_arr_obj[i]._id) {
                    //console.log('tabid = interface id at index:', i);
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
            if (typeof(page_arr_obj[pageIndex].video[0].videoURL) === 'undefined' || typeof(page_arr_obj[pageIndex].video[0].videoURL) === '') {
                // return;
                this.props.setVideoUrl('', interface_obj);
            } else {
                this.props.setVideoUrl(page_arr_obj[pageIndex].video[0].videoURL, interface_obj);
                
            }
        } 
    }
    componentWillReceiveProps(nextProps) {
        console.log("NEXT PROPS: ", nextProps);
        if (this.props.interface_obj.page_id !== nextProps.interface_obj.page_id){
            this.updateVideoComponent(nextProps);
        }

        // if (nextProps.interface_obj.sent_to_db) {
        //     this.props.updateBinderArray();
        //     console.log("BINDER HAS BEEN UPDATED");
        // } else {
        //     this.updateVideoComponent(nextProps);
        // }
    }
    renderInput({ input, defaultValue }) {
        
        return (
            <div id="input-field" className="col s8 input-field">
                <input type="text" {...input} id="query" placeholder="Search on Youtube..." className="form-control" />
            </div>
        )
    }

    updateVideoComponent(nextProps) {
        console.log("update video component");
        let { tab_arr_obj } = nextProps.binderObj;
        let { interface_obj } = nextProps;
        if (tab_arr_obj) {
            let tabArrLength = tab_arr_obj.length;
            let tabIndex = null;
            let pageIndex = null;
            for (let i = 0; i < tabArrLength; i++) {
                if (interface_obj.tab_id === tab_arr_obj[i]._id) {
                    //console.log('tabid = interface id at index:', i);
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
            if (pageIndex !== null && page_arr_obj[pageIndex].hasOwnProperty('video') && page_arr_obj[pageIndex].video[0].hasOwnProperty('videoId')) {
                // return;
                this.props.setVideoUrl(page_arr_obj[pageIndex].video[0].videoURL, interface_obj);
                this.props.slideOutVideoSearch(false, 'translate(-119px)');
            } else {
                this.props.setVideoUrl('', interface_obj);
                this.props.slideOutVideoSearch(this.props.toggleSlideOut, this.props.slideOutStyles);
            }
        } 
    }

    render() {
        const { resultsVideoUrl } = this.props;
        console.log("video props:", resultsVideoUrl);
        return (
            <div className="main">
                <VideoModal />
                {/* <div style={this.props.opacityContainer} className="opacity"></div> */}
                <div style={this.props.resultsStyles} className="results-container sidebar">
                    <div className="row btn-wrapper">
                        <form onSubmit={this.props.handleSubmit(this.search.bind(this))} id="search-input-container" className="search-button-input">
                            <Field name="video" defaultValue={resultsVideoUrl} component={this.renderInput} />
                            <span className="input-group-btn btn-wrapper">
                                <button id="search-button" className="btn results-btn video-btn red darken-3">
                                <i className="material-icons">search</i>
                                </button>

                                <button className="btn results-btn vid-right-arrow video-btn" onClick={ () => {
                                this.props.getResultStyles(this.props.resultsStyles, this.props.toggleResultsBool)
                                this.props.getOpacityDisplay(this.props.opacityContainer, this.props.toggleResultsBool)
                                }}>
                                    <i className="material-icons">close</i>
                                </button>

                            </span>
                        </form>
                    </div>
                    <div className="row">
                        <Results results={this.props.videoResults} />
                    </div>
                </div>
                <div id="video-wrapper" className="video-wrapper third-step">
                    <VideoContainer />
                </div>
            </div>
        );
    }
}

Video = reduxForm({
    form: 'search-item'
})(Video);

function mapStateToProps(state) {
    return {
        pastedVideoUrl: state.videoResults.videoLink,
        videoResults: state.video.results,
        playlist: state.video.videoList,
        resultsStyles: state.video.resultsStyles,
        opacityContainer: state.video.opacityDisplay,
        toggleResultsBool: state.video.toggleResults,
        interface_obj: state.interface,
        binderObj: state.binder.binderObj,
        slideOutStyles: state.video.videoLinkSlideOut,
        toggleSlideOut: state.video.toggleSlideOut
    }
}

export default connect(mapStateToProps, { getResultStyles, getOpacityDisplay, toggleResults, getVideoResults, setVideoUrl, updateBinderArray, getDataObject, slideOutVideoSearch })(Video);