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
            <div className="col-sm-9">
                <input className="slides-input form-control" {...input} placeholder="Paste a Google Slides URL..." />
            </div>
        )
    }

    componentWillReceiveProps(nextProps) {
        let { tab_arr_obj } = nextProps.binderObj;
        let { interface_obj } = nextProps;
        
        if (tab_arr_obj) {
        let tabArrLength = tab_arr_obj.length;
        let tabIndex = null;
        let pageIndex = null;
        for (let i = 0; i < tabArrLength; i++) {
            if (interface_obj.tab_id === tab_arr_obj[i]._id) {
                //console.log('tabid = interface id at index:', i);
                tabIndex = i;
                break;
            }
        }
        const { page_arr_obj } = tab_arr_obj[tabIndex];
        for (let i = 0; i < tabArrLength; i++) {
            if (interface_obj.page_id === page_arr_obj[i]._id) {
                pageIndex = i;
                break;
            }
        }
        if (!page_arr_obj[pageIndex].lecture_slides) {
            return;
        } else {
            this.props.setSlidesUrl(page_arr_obj[pageIndex].lecture_slides.lec_id, interface_obj);
        }
    } else {
        console.log("DOES NOT WORK");
    }
    }
    componentWillMount() {
        let { tab_arr_obj } = this.props.binderObj;
        let { interface_obj } = this.props;
        
        if (tab_arr_obj) {
        let tabArrLength = tab_arr_obj.length;
        let tabIndex = null;
        let pageIndex = null;
        for (let i = 0; i < tabArrLength; i++) {
            if (interface_obj.tab_id === tab_arr_obj[i]._id) {
                //console.log('tabid = interface id at index:', i);
                tabIndex = i;
                break;
            }
        }
        const { page_arr_obj } = tab_arr_obj[tabIndex];
        for (let i = 0; i < tabArrLength; i++) {
            if (interface_obj.page_id === page_arr_obj[i]._id) {
                pageIndex = i;
                break;
            }
        }
        if (!page_arr_obj[pageIndex].lecture_slides) {
            return;
        } else {
            this.props.setSlidesUrl(page_arr_obj[pageIndex].lecture_slides.lec_id, interface_obj);
        }
    } else {
        console.log("DOES NOT WORK");
    }
    }
    setURLinReduxForm(values) {
        this.props.setSlidesUrl(values.url, this.props.interface_obj);
    }

    render() {
        return (
            <div className="slides-div">
                <form className="form-horizontal" onSubmit={this.props.handleSubmit(this.setURLinReduxForm.bind(this))}>
                    <Field name="url" component={this.renderInput} />
                    <button className="btn btn-success"><span className="glyphicon glyphicon-save"></span></button>
                </form>
                {
                    this.props.slide_input ?
                        <iframe src={this.props.slide_input} frameBorder="0" className="slides-iframe" allowFullScreen></iframe>
                        : <p className="text-danger"><em>Please paste a valid Google Slides URL</em></p>
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
        interface_obj: state.interface,
        binderObj: state.binder.binderObj,
    }
};

export default connect(mapStateToProps, { setSlidesUrl })(Slides);