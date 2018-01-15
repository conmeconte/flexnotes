import React, { Component } from 'react';
import { connect } from 'react-redux';
import { playVideo, grabVideoUrl, addVideoUrl, addToPlaylist } from '../actions';

class VideoContainer extends Component {
    render () {
    return ( 
            <div id="video-container" className="video-container">
                <div className="row mb-2">
                    <div className="col-xs-8">
                        <input className="pastedVideoInput form-control" type="text" placeholder="Please copy and paste URL"/>
                    </div>
                    <button className="btn btn-success mr-1" onClick={ () => {
                        this.props.grabVideoUrl();
                        this.props.playVideo();
                    }}>Embed Video</button>
                    <button onClick={ () => {this.props.addToPlaylist(this.props.pastedVideoUrl, this.props.binderTabPageIds)}} className="btn btn-primary">
                        <span className="glyphicon glyphicon-plus"></span>
                    </button>
                </div>
                <iframe style={ {width: '100%', height: '100%'} } className="currentVideo" src="null"></iframe>
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {
        pastedVideoUrl: state.videoResults.videoLink,
        binderTabPageIds: state.interface,
        playlist: state.videoResults.playlist
    }
}

export default connect(mapStateToProps, { playVideo, grabVideoUrl, addToPlaylist })(VideoContainer)