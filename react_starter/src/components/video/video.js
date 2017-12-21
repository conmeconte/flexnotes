import React, {Component} from 'react';
import './video.css';

class Video extends Component {
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