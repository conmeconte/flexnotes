import React, { Component } from 'react';
import '../assets/css/slides.css';
import axios from 'axios';

class Slides extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: '',
            inputValid: false,
            inputComplete: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(e) {
        console.log(e.target.value);
        const { value } = e.target;
        if (value.indexOf('/d/') !== -1) {
            const urlSplit1 = value.split("/d/");
            const urlSplit2 = urlSplit1[1].split('/');
            let presentationID = urlSplit2[0];
            const slidesURL = `https://docs.google.com/presentation/d/${presentationID}/embed`
            // if able to save slide id ?slide=id.${slideID}`

            this.setState({
                input: slidesURL,
                inputValid: true,
                inputComplete: false
            })
        } else {
            this.setState({
                input: '',
                inputValid: false,
                inputComplete: false
            })
        }

    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({
            inputComplete: true
        })
        console.log(this.state.input);

        const URL = "http://localhost:3000/api/page";

        axios.get(URL).then((resp) => {
            console.log(resp);
        });

        axios.put(URL, {
            lecture_slides:{
                lec_id: this.state.input
            
        }}).then((resp) => {
            console.log(resp);
        });
    }

    render() {

        const { input, inputComplete, inputValid } = this.state;
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input onChange={this.handleInputChange} value={input} type="text" />
                    <button className="btn btn-success btn-sm">Upload</button>
                </form>
                {
                    inputComplete && inputValid ?
                        <iframe src={input} frameBorder="0" className="slides-iframe"></iframe>
                        : <p><em>Please paste a valid Google Slides URL</em></p>
                }
            </div>
        )
    }
}

export default Slides;