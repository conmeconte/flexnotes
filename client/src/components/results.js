import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addToPlayList, playVideo } from '../actions/index';
// import 'bootstrap/dist/css/bootstrap.min.css';

class Results extends Component {
    addToPlayList (obj) {
        videoData.items.push(obj);
        console.log(videoData);
    }
    handlePlayVideo(videoUrl) {
        this.props.playVideo(videoUrl); 
    }
    render() {
        const {results} = this.props;
        console.log("video results: ", results)
        const list = results.map((item, index) => {
            console.log(item.url);
            return (
                <li onMouseOver={ () => {this.showVideoDescription(item.description)}} className="result-item collection-item col s12" key={index}>
                    <div className="row list-item-wrap-container">
                        <div className="row list-item-wrapper col s10">
                            <img src={results[index].thumbnails.default.url}/>
                            <div className="col s10 video-contents">
                                <div>
                                    <span className="video-items">{item.videoTitle}</span>
                                </div>
                            </div>
                        </div>
                        <button id="youtube-play" className="btn red darken-3 right video-btn" onClick={ () => { this.handlePlayVideo(item.url) }}>
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
        url: state.url
    }
}

export default connect(mapStateToProps, { addToPlayList, playVideo })(Results);