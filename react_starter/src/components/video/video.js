import React, {Component} from 'react';
import './video.css';
import $ from 'jquery';
import Results from './results';

// const BASE_URL = 'https://www.googleapis.com/youtube/v3/channels?part=contentDetails&mine=true';
const API_KEY = 'AIzaSyCGMjVZZ0fUy-XXyU7TTUCCZJUIosTjnXI';

class Video extends Component {
    constructor (props) {
        super(props);
        this.googleApiClientReady = this.googleApiClientReady.bind(this);
        this.checkAuth = this.checkAuth.bind(this);
        this.handleAuthResult = this.handleAuthResult.bind(this);
        this.loadAPIClientInterfaces = this.loadAPIClientInterfaces.bind(this);
        this.search = this.search.bind(this);
        this.OAUTH2_CLIENT_ID = '921823203830-e91j7vj9gqr6ftkvcaot3iffhcii7vtp.apps.googleusercontent.com';
        this.OAUTH2_SCOPES = ['https://www.googleapis.com/auth/youtube'];
        this.state = {
            videos: []
        }
    }
    componentDidMount() {
        this.loadYouTubeApi();
    }
    loadYouTubeApi () {
        const script = document.createElement("script");
        script.src = 'https://apis.google.com/js/client.js?onload=googleApiClientReady';
        script.onload = () => {
            gapi.load('client', () => {
                gapi.client.setApiKey(API_KEY);
                gapi.client.load('youtube', 'v3', () => {
                    this.setState({ gapiReady: true });
                });
            });
        }
        document.body.appendChild(script);
    }
    googleApiClientReady () {
        gapi.auth.init(function() {
            window.setTimeout(checkAuth, 1);
        });
    }
    checkAuth () {
        gapi.auth.authorize({
            client_id: this.OAUTH2_CLIENT_ID,
            scope: this.OAUTH2_SCOPES,
            immediate: true
        }, this.handleAuthResult);
    }
    handleAuthResult (authResult) {
        if (authResult && !authResult.error) {
            // Authorization was successful. Hide authorization prompts and show
            // content that should be visible after authorization succeeds.
            $('.pre-auth').hide();
            $('.post-auth').show();
            this.loadAPIClientInterfaces();
        } else {
            // Make the #login-link clickable. Attempt a non-immediate OAuth 2.0
            // client flow. The current function is called when that flow completes.
//            $('#login-link').click(function() {
            gapi.auth.authorize({
                client_id: this.OAUTH2_CLIENT_ID,
                scope: this.OAUTH2_SCOPES,
                immediate: false
            }, this.handleAuthResult);
//            });
        }
    }
    loadAPIClientInterfaces () {
        gapi.client.load('youtube', 'v3', function() {
            console.log('API Loaded. Ready for search.')
        });
    }
    search () {
        this.checkAuth();
        this.loadAPIClientInterfaces();
        var q = $('#query').val();
        var request = gapi.client.youtube.search.list({
            q: q,
            part: 'snippet'
        });
        request.execute((response) => {
            const videos = [];
            const listOfVideoInfo = response.result.items;
            for (var listOfVideoInfoIndex = 0; listOfVideoInfoIndex < listOfVideoInfo.length; listOfVideoInfoIndex++) {
                const vidObject = {
                    videoTitle: listOfVideoInfo[listOfVideoInfoIndex].snippet.title,
                    videoId: listOfVideoInfo[listOfVideoInfoIndex].id.videoId,
                    url: 'https://www.youtube.com/embed/' + listOfVideoInfo[listOfVideoInfoIndex].id.videoId,
                    description: listOfVideoInfo[listOfVideoInfoIndex].snippet.description,
                    channelTitle: listOfVideoInfo[listOfVideoInfoIndex].snippet.channelTitle,
                    channelId: listOfVideoInfo[listOfVideoInfoIndex].snippet.channelId,
                    thumbnails: listOfVideoInfo[listOfVideoInfoIndex].snippet.thumbnails
                };
                videos.push(vidObject);
            }
            console.log("List of video objects: ", videos);
            this.setState({
                videos: videos
            });
        });
    }
    render() {
            const {videos} = this.state;
            console.log(videos);
            return (
                <div className="container col-xs-6 col-sm-offset-3 main-vid-container">
                    <div className="input-group">
                        <input id="query" className="form-control" type="text"/>
                        <span className="input-group-btn">
                    <button id="search-button" type="button" className="btn btn-primary"
                            onClick={this.search}>Search</button>
                    <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown"
                            aria-haspopup="true" aria-expanded="false">
                    <span className="caret"></span>
                    </button>
                    <ul className="dropdown-menu">
                    <li><a href="#">URL</a></li>
                    <li><a href="#">Keyword</a></li>
                    </u
                    </span>
                    </div>
                    <div className="video-container">

                    </div>
                    <div className="results-container">
                        <Results results={videos}/>
                    </div>
                </div>
            );
    }
}

export default Video;