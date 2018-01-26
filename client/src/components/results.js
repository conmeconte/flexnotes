import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addToPlaylist, playVideo, slideOutVideoSearch } from '../actions/index';
// import 'bootstrap/dist/css/bootstrap.min.css';

class Results extends Component {
    addToPlayList (obj) {
        videoData.items.push(obj);
        // console.log(videoData);
    }
    handlePlayVideo(videoUrl) {
        this.props.playVideo(videoUrl);
        this.props.addToPlaylist(videoUrl, '', this.props.interface_obj);
        this.props.slideOutVideoSearch(false, '');
    }
    render() {
        const {results} = this.props;
        // console.log("video results: ", results)
        const list = results.map((item, index) => {
            // console.log(item.url);
            return (
                <li className="result-item collection-item col s12" key={index}>
                    <div className="row list-item-wrap-container">
                        <div className="row list-item-wrapper col s10">
                            <img src={results[index].thumbnails.default.url}/>
                            <div className="col s10 video-contents">
                                <div>
                                    <span className="video-items">{item.videoTitle}</span>
                                </div>
                            </div>
                        </div>
                        <button id="youtube-play" className="btn red darken-3 right video-btn" onClick={ () => { 
                            this.handlePlayVideo(item.url) 
                             }}>
                                <i className="material-icons">play_arrow</i>
                        </button>
                    </div>
                </li>
            );
        });
        return (
            <ul className="results collection">{list}</ul>
        );
    }
}

function mapStateToProps (state) {
    return {
        url: state.url,
        interface_obj: state.interface
    }
}

export default connect(mapStateToProps, { addToPlaylist, playVideo, slideOutVideoSearch })(Results);