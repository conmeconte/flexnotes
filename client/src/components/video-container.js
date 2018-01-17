import React, { Component } from 'react';
import { connect } from 'react-redux';
import { playVideo, grabVideoUrl, addVideoUrl, addToPlaylist, toggleModal, getResultStyles, getOpacityDisplay } from '../actions';

class VideoContainer extends Component {
    render () {
    return ( 
            <div id="video-container" className="video-container">
                <div className="row">
                    <div className="col-xs-8">
                        <input className="pastedVideoInput form-control col-xs-12" type="text" placeholder="Please copy and paste YouTube URL..."/>
                    </div>
                    <button className="btn btn-success col-xs-1" onClick={ () => {
                        this.props.grabVideoUrl();
                        this.props.playVideo();
                        this.props.toggleModal(this.props.addVideoModalStyle)
                    }}><span className="glyphicon glyphicon-save"></span></button>
                    <button className="btn btn-primary col-xs-1" onClick={ () => {
                    this.props.getResultStyles(this.props.resultsStyles, this.props.toggleResultsBool)
                    this.props.getOpacityDisplay(this.props.opacityContainer, this.props.toggleResultsBool)
                }}><span className="glyphicon glyphicon-chevron-left"></span></button>
                </div>
                
                <div className="video-embed-wrapper"></div>
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {
        pastedVideoUrl: state.videoResults.videoLink,
        binderTabPageIds: state.interface,
        playlist: state.videoResults.playlist,
        addVideoModalStyle: state.video.addVideoModal,
        videoTitle: state.video.videoTitle,
        resultsStyles: state.video.resultsStyles,
        toggleResultsBool: state.video.toggleResults,
        opacityContainer: state.video.opacityDisplay
    }
}

export default connect(mapStateToProps, { playVideo, grabVideoUrl, addToPlaylist, toggleModal, getResultStyles, getOpacityDisplay })(VideoContainer)