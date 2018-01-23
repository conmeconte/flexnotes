import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { playVideo, grabVideoUrl, addVideoUrl, addToPlaylist, toggleModal, getResultStyles, getOpacityDisplay, playPastedLinkVideo, updateBinderArray, getDataObject } from '../actions';



class VideoContainer extends Component {
    constructor (props) {
        super(props);
        this.slideOutVideoSearch = this.slideOutVideoSearch.bind(this);
        this.state = {
            style: {
                transform: 'translateY(-55px)'
            },
            toggleSlideOut: true
        }
    }
    renderInput ({input}) {
        console.log({input});
        return (
            <div className="col s8">
                <input {...input} className="pastedVideoInput" type="text" placeholder="Paste a YouTube video URL..."/>
            </div>
        );
    }
    handleYouTubeUrl (values) {
        console.log("VALUES: ", values)
        this.props.grabVideoUrl(values.input);
        this.props.playPastedLinkVideo(values["youtube-url"]);
        this.props.toggleModal(this.props.addVideoModalStyle);
        //this.props.getDataObject();
        //this.props.updateBinderArray();
    }
    // componentWillReceiveProps(nextProps){
    //     debugger
    // }
    slideOutVideoSearch() {
        let { toggleSlideOut } = this.state;
        let { transform } = this.state.style;
        if (toggleSlideOut) {
            transform = 'translateY(0px)',
            toggleSlideOut = false;
        } else {
            transform = 'translateY(-55px)';
            toggleSlideOut = true;
        }
        this.setState({
            style: {
                transform: transform
            },
            toggleSlideOut: toggleSlideOut
        });
    }
    render () {
        const { toggleSlideOut } = this.state;
        const { transform } = this.state.style;
    return ( 
        <div className="iframe-wrapper">
            <div className="row">
                <form onSubmit={this.props.handleSubmit(this.handleYouTubeUrl.bind(this))}>
                    <div style={{ transform }} className="row slide-out-input">
                    <Field name="youtube-url" component={this.renderInput} />
                        <div className="col s3">
                            <div className="row btn-wrapper">
                                <button className="btn btn-success green darken-1"><i className="material-icons">save</i></button>
                                <button type="button" className="btn btn-primary vidList vid-left-arrow" onClick={ () => {
                                this.props.getResultStyles(this.props.resultsStyles, this.props.toggleResultsBool)
                                this.props.getOpacityDisplay(this.props.opacityContainer, this.props.toggleResultsBool)
                                }}><i className="fa fa-youtube" aria-hidden="true"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
                <div className="arrow-container" onClick={ () => {
                    this.slideOutVideoSearch()
                }}>
                    { !toggleSlideOut ? <i className="material-icons">keyboard_arrow_up</i> : <i className="material-icons">keyboard_arrow_down</i> }
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
        interface_obj: state.interface
    }
}

VideoContainer = reduxForm({
    form: 'youtube-url'
})(VideoContainer)

export default connect(mapStateToProps, { playVideo, grabVideoUrl, addToPlaylist, toggleModal, getResultStyles, getOpacityDisplay, playPastedLinkVideo, updateBinderArray, getDataObject })(VideoContainer)