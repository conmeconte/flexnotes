import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { playVideo, grabVideoUrl, addVideoUrl, addToPlaylist, toggleModal, getResultStyles, getOpacityDisplay, playPastedLinkVideo, updateBinderArray, getDataObject, slideOutVideoSearch } from '../actions';



class VideoContainer extends Component {
    renderInput ({input, type, placeholder, meta: { error, touched }}) {
        console.log({input});
        return (
            <div className="col s8 input-field">
                <input {...input} className="pastedVideoInput" type={type} placeholder="Paste a YouTube video URL..."/>
                <p className="red-text">{ touched && error }</p>
            </div>
        );
    }
    handleYouTubeUrl (values) {
        console.log(values);
        console.log("HERE IS A VIDEO INPUT", values["youtube-url"]);
        const youtubeLinkInput = values["youtube-url"];
        if (!youtubeLinkInput || youtubeLinkInput.indexOf("youtu") === -1) {
            return;
        }
        // console.log(values.input);
        // if (!value) {
        //     console.log("PLEASE SEARCH A VIDEO.");
        //     return;
        // }
        this.props.grabVideoUrl(values.input);
        this.props.playPastedLinkVideo(values["youtube-url"]);
        this.props.toggleModal(this.props.addVideoModalStyle);
        this.props.reset()
        //this.props.getDataObject();
        //this.props.updateBinderArray();
    }
    // componentWillReceiveProps(nextProps){
    //     debugger
    // }
    render () {
    return ( 
        <div className="iframe-wrapper">
            <div className="row">
                <form onSubmit={this.props.handleSubmit(this.handleYouTubeUrl.bind(this))}>
                    <div style={ this.props.slideOutStyles } className="row slide-out-input">
                    <Field name="youtube-url" component={this.renderInput} />
                        <div className="col s3">
                            <div className="row btn-wrapper">
                                <button className="btn btn-success green darken-1 video-btn"><i className="material-icons">save</i></button>
                                <button type="button" className="btn btn-primary vidList vid-left-arrow video-btn" onClick={ () => {
                                this.props.getResultStyles(this.props.resultsStyles, this.props.toggleResultsBool)
                                this.props.getOpacityDisplay(this.props.opacityContainer, this.props.toggleResultsBool)
                                }}><i className="fa fa-youtube" aria-hidden="true"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
                <div className="arrow-container" onClick={ () => {
                    this.props.slideOutVideoSearch(this.props.toggleSlideOut, this.props.slideOutStyles );
                }}>
                    { !this.props.toggleSlideOut ? <i className="material-icons">keyboard_arrow_up</i> : <i className="material-icons">keyboard_arrow_down</i> }
                </div>
            </div>
            <div id="video-container" className="video-container">
                <div className="video-embed-wrapper">
                    <iframe allowFullScreen id="video-iframe" src={this.props.videoLink} className="video-iframe"></iframe>
                </div>
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
        opacityContainer: state.video.opacityDisplay,
        interface_obj: state.interface,
        slideOutStyles: state.video.videoLinkSlideOut,
        toggleSlideOut: state.video.toggleSlideOut
    }
}

function validate(values) {
    const error = {};
    if (!values["youtube-url"]) {
        error["youtube-url"] = 'Please paste a valid YouTube Url'
    }
    return error;
}

VideoContainer = reduxForm({
    form: 'youtube-url',
    validate
})(VideoContainer)

export default connect(mapStateToProps, { playVideo, grabVideoUrl, addToPlaylist, toggleModal, getResultStyles, getOpacityDisplay, playPastedLinkVideo, updateBinderArray, getDataObject, slideOutVideoSearch })(VideoContainer)