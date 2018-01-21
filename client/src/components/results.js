import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addToPlayList, playVideo } from '../actions/index';
// import 'bootstrap/dist/css/bootstrap.min.css';

class Results extends Component {
    addToPlayList (obj) {
        videoData.items.push(obj);
        console.log(videoData);
    }
    render() {
        const {results} = this.props;
        console.log("video results: ", results)
        const list = results.map((item, index) => {
            console.log(item.url);
            return (
                <li className="result-item collection-item col s12" key={index}>
                    <p className="video-items">{item.videoTitle}</p>
                    <button className="btn" onClick={ () => { this.props.playVideo(item.url) }}>
                    <i className="material-icons">play_arrow</i>

                    </button>
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