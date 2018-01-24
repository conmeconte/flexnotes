import React, { Component } from 'react';
// import '../assets/css/slides.css';
import axios from 'axios';
import { setSlidesUrl, getSlidesURL, updateBinderArray, resetSlidesURL } from '../actions';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

class Slides extends Component {
    constructor(props) {
        super(props);
        this.slideOutSlidesSearch = this.slideOutSlidesSearch.bind(this);
        this.state = {
            style: {
                transform: 'translateY(-100px)'
            },
            toggleSlideOut: true
        }
    }
    renderInput(props) {
        const { input, meta: { touched, error } } = props;
        return (
            <div className="col s8 input-field">
                <input id="slides-input" className="slides-input form-control" {...input} type="text" placeholder="Paste a Google Slides URL..." />
                <p><em>{touched && error ? error : ''}</em></p>
            </div>
        )
    }
    slideOutSlidesSearch() {
        let { toggleSlideOut } = this.state;
        let { transform } = this.state.style;
        if (toggleSlideOut) {
            transform = 'translateY(0px)',
                toggleSlideOut = false;
        } else {
            transform = 'translateY(-100px)';
            toggleSlideOut = true;
        }
        this.setState({
            style: {
                transform: transform
            },
            toggleSlideOut: toggleSlideOut
        });
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.interface_obj.page_id !== this.props.interface_obj.page_id) {
            let { tab_arr_obj } = nextProps.binderObj;
            let { interface_obj } = nextProps;

            if (tab_arr_obj) {
                let tabArrLength = tab_arr_obj.length;
                let tabIndex = null;
                let pageIndex = null;
                for (let i = 0; i < tabArrLength; i++) {
                    if (interface_obj.tab_id === tab_arr_obj[i]._id) {
                        tabIndex = i;
                        break;
                    }
                }
                const { page_arr_obj } = tab_arr_obj[tabIndex];
                for (let i = 0; i < page_arr_obj.length; i++) {
                    if (interface_obj.page_id === page_arr_obj[i]._id) {
                        pageIndex = i;
                        break;
                    }
                }
                if (tab_arr_obj[tabIndex].page_arr_obj[pageIndex].hasOwnProperty("lecture_slides")) {
                    this.props.getSlidesURL(tab_arr_obj[tabIndex].page_arr_obj[pageIndex].lecture_slides.lec_id)
                } else {
                    this.props.resetSlidesURL('');
                }

            }
            else {
                console.log("DOES NOT WORK");
            }
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
                    tabIndex = i;
                    break;
                }
            }
            const { page_arr_obj } = tab_arr_obj[tabIndex];
            for (let i = 0; i < page_arr_obj.length; i++) {
                if (interface_obj.page_id === page_arr_obj[i]._id) {
                    pageIndex = i;
                    break;
                }
            }
            if (tab_arr_obj[tabIndex].page_arr_obj[pageIndex].hasOwnProperty("lecture_slides")) {
                this.props.getSlidesURL(tab_arr_obj[tabIndex].page_arr_obj[pageIndex].lecture_slides.lec_id)
            } else {
                this.props.resetSlidesURL('');
            }
        } else {
            console.log("DOES NOT WORK");
        }
    }
    setURLinReduxForm(values) {
        if (values.url.indexOf('presentation/d/') !== -1 || values.url.indexOf('presentation/d/e') !== -1) {
            if (values.url.indexOf('presentation/d/e/') !== -1) {
                const urlSplit1 = values.url.split("presentation/d/e/");
                const urlSplit2 = urlSplit1[1].split('/');
                let presentationID = urlSplit2[0];
                const slidesURL = `https://docs.google.com/presentation/d/e/${presentationID}/embed`;
                this.props.setSlidesUrl(slidesURL, this.props.interface_obj);
            }
            else if (values.url.indexOf('presentation/d/') !== -1) {
                const urlSplit1 = values.url.split("presentation/d/");
                const urlSplit2 = urlSplit1[1].split('/');
                let presentationID = urlSplit2[0];
                const slidesURL = `https://docs.google.com/presentation/d/${presentationID}/embed`;
                this.props.setSlidesUrl(slidesURL, this.props.interface_obj);
                this.props.reset();
            }
        } else {
            return;
        }
    }

    render() {
        const { toggleSlideOut } = this.state;
        const { transform } = this.state.style;

        return (
            <div className="slides-div fourth-step">
                <form style={{ transform }} className="form-horizontal slide-out-input" onSubmit={this.props.handleSubmit(this.setURLinReduxForm.bind(this))}>
                    <div className="row">
                        <Field name="url" component={this.renderInput} />
                        <button className="btn green darken-1 col s2 slidesBtn"><i style={{ marginRight: "0px" }} className="material-icons">check</i></button>
                    </div>
                </form>
                <div className="arrow-container-slides" onClick={() => {
                    this.slideOutSlidesSearch()
                }}>
                    {!toggleSlideOut ? <i className="material-icons">keyboard_arrow_up</i> : <i className="material-icons">keyboard_arrow_down</i>}
                </div>
                {
                    this.props.slide_input ?
                        <iframe src={this.props.slide_input} frameBorder="0" className="slides-iframe" allowFullScreen></iframe>
                        : ""
                }
            </div>
        )
    }
}

function validate(values) {
    const errors = {};
    const valuesStr = values.url;
    console.log('VALIDATE slides:', valuesStr);
    if (valuesStr) {
        if (valuesStr.indexOf('docs.google.com/presentation/d/') === -1) {
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

export default connect(mapStateToProps, { setSlidesUrl, updateBinderArray, getSlidesURL, resetSlidesURL })(Slides);