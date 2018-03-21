import React, { Component } from 'react';
// import '../assets/css/slides.css';
import axios from 'axios';
import {
  setSlidesUrl,
  getSlidesURL,
  updateBinderArray,
  resetSlidesURL
} from '../actions';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

class Slides extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slideOutStyles: {
        transform: 'translateY(0%)'
      },
      isOut: true
    };
    this.toggleSlideOut = this.toggleSlideOut.bind(this);
  }
  renderInput(props) {
    const { input, meta: { touched, error } } = props;
    return (
      <div className="col s8 input-field">
        <input
          id="slides-input"
          className="slides-input form-control"
          {...input}
          type="text"
          placeholder="Paste a Google Slides URL..."
        />
        <p className="red-text">
          <em>
            {touched && error ? error : ''}
          </em>
        </p>
      </div>
    );
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
        if (
          pageIndex !== null &&
          tab_arr_obj[tabIndex].page_arr_obj[pageIndex].hasOwnProperty(
            'lecture_slides'
          )
        ) {
          this.props.getSlidesURL(
            tab_arr_obj[tabIndex].page_arr_obj[pageIndex].lecture_slides.lec_id
          );
          this.toggleSlideOut(true);
        } else {
          this.props.resetSlidesURL('');
          this.toggleSlideOut(false);
        }
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
      if (
        tab_arr_obj[tabIndex].page_arr_obj[pageIndex].hasOwnProperty(
          'lecture_slides'
        )
      ) {
        this.props.getSlidesURL(
          tab_arr_obj[tabIndex].page_arr_obj[pageIndex].lecture_slides.lec_id
        );
        this.toggleSlideOut(true);
      } else {
        this.props.resetSlidesURL('');
        this.toggleSlideOut(false);
      }
    }
  }
  setURLinReduxForm(values) {
    if (
      values.url.indexOf('presentation/d/') != -1 ||
      values.url.indexOf('presentation/d/e') != -1
    ) {
      if (values.url.indexOf('presentation/d/e/') !== -1) {
        const urlSplit1 = values.url.split('presentation/d/e/');
        const urlSplit2 = urlSplit1[1].split('/');
        let presentationID = urlSplit2[0];
        const slidesURL = `https://docs.google.com/presentation/d/e/${presentationID}/embed`;
        this.props.setSlidesUrl(slidesURL, this.props.interface_obj);
      } else if (values.url.indexOf('presentation/d/') !== -1) {
        const urlSplit1 = values.url.split('presentation/d/');
        const urlSplit2 = urlSplit1[1].split('/');
        let presentationID = urlSplit2[0];
        const slidesURL = `https://docs.google.com/presentation/d/${presentationID}/embed`;
        this.props.setSlidesUrl(slidesURL, this.props.interface_obj);
      }
      this.toggleSlideOut(true);
      this.props.reset();
    } else {
      return;
    }
  }
  toggleSlideOut(isOut) {
    var slideOutStyles;
    if (isOut) {
      slideOutStyles = 'translateY(-100%)';
    } else {
      slideOutStyles = 'translateY(0%)';
    }
    this.setState({
      slideOutStyles: {
        transform: slideOutStyles
      },
      isOut: !isOut
    });
  }
  render() {
    const { slideOutStyles, isOut } = this.state;
    return (
      <div className="slides-div slides-div-safari fourth-step">
        <form
          style={slideOutStyles}
          className="form-horizontal slide-out-input"
          onSubmit={this.props.handleSubmit(this.setURLinReduxForm.bind(this))}
        >
          <div className="row">
            <Field name="url" component={this.renderInput} />
            <button className="btn green darken-1 col s2 slidesBtn">
              <i style={{ marginRight: '0px' }} className="material-icons">
                add
              </i>
            </button>
          </div>
        </form>
        <div
          onClick={() => {
            this.toggleSlideOut(isOut);
          }}
          className="arrow-container-slides"
        >
          {isOut
            ? <i className="material-icons">remove</i>
            : <i className="material-icons">add</i>}
        </div>
        <div className="slides-container">
          <div className="resize-blocker2" />
          {this.props.slide_input
            ? <iframe
                src={this.props.slide_input}
                frameBorder="0"
                className="slides-iframe"
                allowFullScreen
              />
            : ''}
        </div>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};
  const valuesStr = values.url;
  // console.log('VALIDATE slides:', valuesStr);
  if (valuesStr) {
    if (valuesStr.indexOf('docs.google.com/presentation/d/') === -1) {
      errors.url = 'Please paste a valid Google Slides URL';
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
    binderObj: state.binder.binderObj
  };
}

export default connect(mapStateToProps, {
  setSlidesUrl,
  updateBinderArray,
  getSlidesURL,
  resetSlidesURL
})(Slides);
