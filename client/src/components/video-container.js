import React, { Component } from 'react';
import { connect } from 'react-redux';
import { playVideo, grabVideoUrl } from '../actions';

class VideoContainer extends Component {
    render () {
    return ( 
            <div id="video-container" className="video-container">
                <input className="pastedVideoInput form-control" type="text" placeholder="Please copy and paste URL"/><button className="btn btn-success" onClick={ () => {
                    // this.props.grabVideoUrl(this.props.pastedVideoUrl);
                    this.props.playVideo();
                }}>Embed Video</button><button className="btn btn-primary"><span className="glyphicon glyphicon-plus"></span></button>
                <iframe style={ {width: '100%', height: '100%'} } className="currentVideo" src="null"></iframe>
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {
        videoUrl: state.results.url,
        pastedVideoUrl: state.results.pastedVideoUrl
    }
}

export default connect(mapStateToProps, { playVideo, grabVideoUrl })(VideoContainer)