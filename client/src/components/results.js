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
                <li className="result-item collection-item col s12" key={index}>
                    <div className="row list-item-wrapper">
                        <img className="col s3" src={results[index].thumbnails.default.url}/>
                        <span className="video-items col s6">{item.videoTitle}</span>
                        <button id="youtube-play" className="btn red darken-3 right col s1 video-btn" onClick={ () => { this.handlePlayVideo(item.url) }}>
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