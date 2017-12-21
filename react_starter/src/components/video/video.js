import React, {Component} from 'react';
import './video.css';
import axios from 'axios';

const BASE_URL = 'https://www.googleapis.com/youtube/v3/search';
const API_KEY = '?=AIzaSyDdIblebqEZ9li79ntEKeDZBQwwCjBXe48';

class Video extends Component {
    constructor (props) {
        super(props);
    }
    componentWillMount () {
        axios.get(`${BASE_URL}`).then( (response) => {
            console.log("Here is a response: ", response);
        })
    }
    render() {
        return (
            <div className="container col-xs-6 col-sm-offset-3 main-vid-container">
                <div className="input-group">
                    <input className="form-control" type="text"/>
                    <span className="input-group-btn">
                        <button type="button" className="btn btn-primary">Search</button>
                        <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown"
                                aria-haspopup="true" aria-expanded="false">
                            <span className="caret"></span>
                        </button>
                        <ul className="dropdown-menu">
                            <li><a href="#">URL</a></li>
                            <li><a href="#">Keyword</a></li>
                        </ul>
                    </span>
                </div>
                <div className="video-container">
                    This is where the video will be.
                </div>
            </div>
        );
    }
}

export default Video;