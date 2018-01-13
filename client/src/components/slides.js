import React, { Component } from 'react';
import '../assets/css/slides.css';
import axios from 'axios';
import { setSlidesUrl } from '../actions';
import { connect } from 'react-redux';

class Slides extends Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     input: '',
        //     inputValid: false,
        //     inputComplete: false
        // };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentWillMount() {
        // const URL = '/api/page';
        // axios.get(URL).then((resp) => {
        //     console.log('slides response is ', resp);
        //     const slidesURL = resp.data.binder_arr_obj["0"].tab_arr_obj["0"].page_arr_obj["0"].lecture_slides.lec_id;
        //     // console.log('SLIDES GET REQ: ', slidesURL);
        //     console.log("SLIDES GET REQ: ", )
        //     //Make the check more valid? But if I PUT request valid data, is it necessary? I will be checking for empty str right?
        //     if (!slidesURL) {
        //         this.setState({
        //             input: ''
        //         });
        //         console.log("Inside !slidesURL if: ", this.state.input);
        //     } else {
        //         this.setState({
        //             input: slidesURL,
        //             inputComplete: true,
        //             inputValid: true
        //         });
        //         // console.log("Else of !slidesURL: ", this.state.input);
        //         // console.log('State at end of compWillMount: ', this.state);
        //     }
        // });
    }

    handleInputChange(e) {
        const { value } = e.target;
        this.props.setSlidesUrl(value)
        // this.setState({
        //     input: slidesURL,
        //     inputValid: true,
        //     inputComplete: false
        //     })
        // } else {
        //     this.setState({
        //         input: '',
        //         inputValid: false,
        //         inputComplete: false
        //     })
        // }

    }

    handleSubmit(e) {
        e.preventDefault();
        console.log('Slides HandleSubmit', e);
        // this.setState({
        //     inputComplete: true
        // })
        // console.log(this.state.input);

        // const URL = "/api/page";

        // axios.put(URL, {
        //     lecture_slides: {
        //         lec_id: this.state.input

        //     },
        //     binderID: "5a57bd348b53621f100237e6",
        //     tabID: "5a57bd348b53621f100237e7",
        //     pageID: "5a57bd348b53621f100237e8"

        // }).then((resp) => {
        //     console.log(`SLIDES PUT REQ:`, resp);
        // });
        // console.log('handleSubmit state ', this.state);
    }

    render() {
        // const { input, inputComplete, inputValid } = this.state;
        return (
            <div className="slides-div">
                <form onSubmit={this.handleSubmit}>
                    <input onChange={this.handleInputChange} value={this.props.input} type="text" />
                    <button className="btn btn-success btn-sm">Upload</button>
                </form>
                {
                    // inputComplete && inputValid
                    true ?
                        <iframe src={this.props.input} frameBorder="0" className="slides-iframe"></iframe>
                        : <p><em>Please paste a valid Google Slides URL</em></p>
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        input: state.slides.setSlidesUrl
    }
};

export default connect(mapStateToProps, { setSlidesUrl })(Slides);