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
        // grab loop to get tab index from /navbar/page.js
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log('Slides HandleSubmit', document.querySelector('.slides-input').value);
        console.log("slides.js hanldeSubmit", this.props);
        this.props.setSlidesUrl(document.querySelector('.slides-input').value, this.props.interface_obj);
    }

    render() {
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
    return {
        slide_input: state.slides.input,
        interface_obj: state.interface
    }
};

export default connect(mapStateToProps, { setSlidesUrl })(Slides);