import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const videoData = {
    vidDimensions: {
        width: "",
        height: ""
    },
    items: []
};

class Results extends Component {
    constructor (props) {
        super(props);
        this.play = this.play.bind(this);
    }
    play (link) {
        console.log(link);
        var iframe = document.createElement("iframe");
        iframe.src = link;
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        document.querySelector(".video-container").innerText = "";
        document.querySelector(".video-container").append(iframe);
    }
    addToPlayList (obj) {
        videoData.items.push(obj);
        console.log(videoData);
    }
    render() {
        const {results} = this.props;
        console.log("Here is the results from the results comp: ", results);
        const list = results.map((item, index) => {
            console.log(item.url);
            return (
                <div className="result-item col-xs-12" key={index}>
                    <li className="video-items">{item.videoTitle}</li>
                    <button className="btn-sm btn-success pull-right" onClick={ () => { this.addToPlayList(item) } }><span className="glyphicon glyphicon-plus"></span></button>
                    <button className="btn-sm btn-primary pull-right" onClick={ () => { this.play(item.url) }}><span className="glyphicon glyphicon-play"></span></button>
                </div>
            );
        });
        return (
            <div className="results text-left">{list}</div>
        );

    }
}
export default Results;