import React, { Component } from 'react';
import '../assets/css/slides.css';


class Slides extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: ''
        };
    }
    render() {
        return (
            <div>
                <input type="text" />
                <iframe src="https://docs.google.com/presentation/d/1kRrOFawfxsEOPd4PlXlceQq2L355XA6pcYWRcq5v4xE/embed?slide=id.g12dc3fc2de_0_6" frameBorder="0" className="slides-iframe"></iframe>
            </div>
        )
    }
}

export default Slides;