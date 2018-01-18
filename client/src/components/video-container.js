import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { playVideo, grabVideoUrl, addVideoUrl, addToPlaylist, toggleModal, getResultStyles, getOpacityDisplay, playPastedLinkVideo } from '../actions';

class VideoContainer extends Component {
    renderInput ({input}) {
        console.log({input});
        return (
            <div className="col-xs-10">
                <input {...input} className="pastedVideoInput form-control col-xs-12" type="text" placeholder="Paste a YouTube video URL..."/>
            </div>
        );
    }
    handleYouTubeUrl (values) {
        console.log("VALUES: ", values)
        // this.props.grabVideoUrl(values.input);
        this.props.playPastedLinkVideo(values["youtube-url"]);
        this.props.toggleModal(this.props.addVideoModalStyle);
    }
    render () {
    return ( 
            <div id="video-container" className="video-container">
                <div className="row">
                    <form onSubmit={this.props.handleSubmit(this.handleYouTubeUrl.bind(this))}>
                        <Field name="youtube-url" component={this.renderInput} />
                    <button className="btn btn-success"><span className="glyphicon glyphicon-save"></span></button>
                </form>
                <button className="btn btn-primary col-offset-xs-1 left-menu-button" onClick={ () => {
                    this.props.getResultStyles(this.props.resultsStyles, this.props.toggleResultsBool)
                    this.props.getOpacityDisplay(this.props.opacityContainer, this.props.toggleResultsBool)
                }}><span className="glyphicon glyphicon-chevron-left"></span></button>
                </div>
                <div className="video-embed-wrapper">
                    <iframe allowFullScreen src={this.props.videoLink} className="video-iframe"></iframe>
                </div>
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {
        pastedVideoUrl: state.videoResults.videoLink,
        videoLink: state.video.videoLink,
        binderTabPageIds: state.interface,
        playlist: state.videoResults.playlist,
        addVideoModalStyle: state.video.addVideoModal,
        videoTitle: state.video.videoTitle,
        resultsStyles: state.video.resultsStyles,
        toggleResultsBool: state.video.toggleResults,
        opacityContainer: state.video.opacityDisplay
    }
}

VideoContainer = reduxForm({
    form: 'youtube-url'
})(VideoContainer)

export default connect(mapStateToProps, { playVideo, grabVideoUrl, addToPlaylist, toggleModal, getResultStyles, getOpacityDisplay, playPastedLinkVideo })(VideoContainer)