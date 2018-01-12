import React, { Component } from 'react';
import { connect } from 'react-redux';
import { playVideo, grabVideoUrl, addVideoUrl } from '../actions';

class VideoContainer extends Component {
    render () {
        console.log("BINDER IDs from video container: ", this.props.binderTabPageIds);
    return ( 
            <div id="video-container" className="video-container">
                <input className="pastedVideoInput form-control" type="text" placeholder="Please copy and paste URL"/><button className="btn btn-success" onClick={ () => {
                    // this.props.grabVideoUrl(this.props.pastedVideoUrl);
                    this.props.playVideo();
                }}>Embed Video</button><button onClick={this.props.addVideoUrl(this.props.videoUrl)} className="btn btn-primary"><span className="glyphicon glyphicon-plus"></span></button>
                <iframe style={ {width: '100%', height: '100%'} } className="currentVideo" src="null"></iframe>
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {
        videoUrl: state.results.url,
        pastedVideoUrl: state.results.pastedVideoUrl,
        binderTabPageIds: state.interface
    }
}

export default connect(mapStateToProps, { playVideo, grabVideoUrl, addVideoUrl })(VideoContainer)