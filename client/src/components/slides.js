import React, { Component } from 'react';
import '../assets/css/slides.css';
import axios from 'axios';
import { setSlidesUrl } from '../actions';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

class Slides extends Component {

    renderInput(props) {
        const { input, meta: { touched, error } } = props;
        console.log('renderInput slides:', props);
        return (
            <div>
                <input className="slides-input" {...input} />
                <p className="text-danger"><em>{touched && error}</em></p>
            </div>
        )
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

    handleSubmit(e) {
        e.preventDefault();
        console.log('Slides HandleSubmit', document.querySelector('.slides-input').value);
        console.log("slides.js hanldeSubmit", this.props);
        this.props.setSlidesUrl(document.querySelector('.slides-input').value, this.props.interface_obj);
        // const URL = "/api/page";

        //     axios.put(URL, {
        //         lecture_slides: {
        //             lec_id: this.props.slide_input

        //         },
        //         binderID: this.props.interface.binder_id,
        //         tabID: this.props.interface.tab_id,
        //         pageID: this.props.interface.page_id

        //     }).then((resp) => {
        //         console.log(`(slides.js ln:94) SLIDES PUT REQ:`, resp);
        //     });
    }

    render() {
        // const { input, inputComplete, inputValid } = this.state;
        return (
            <div className="slides-div">
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <Field name="url" component={this.renderInput} />
                    <button className="btn btn-success btn-sm">Upload</button>
                </form>
                {
                    this.props.slide_input ?
                        <iframe src={this.props.slide_input} frameBorder="0" className="slides-iframe"></iframe>
                        : ""
                }
            </div>
        )
    }
}

function validate(values) {
    console.log('from slides.js validate:', values.url);
    console.log('again from slides.js validate', typeof (values.url));
    const errors = {};
    const valuesStr = values.url;
    if (valuesStr) {
        if (valuesStr.indexOf('presentation/d/') === -1) {
            console.log("Dat's not a url, yo");
            errors.url = "Please paste a valid Google Slides URL";
        }
    }
    return errors;
}

Slides = reduxForm({
    form: 'add-slides-url',
    validate: validate
})(Slides);

function mapStateToProps(state) {
    console.log("mSTP slides.js ln:139", state.slides.input);
    return {
        slide_input: state.slides.input,
        interface_obj: state.interface
    }
};

export default connect(mapStateToProps, { setSlidesUrl })(Slides);