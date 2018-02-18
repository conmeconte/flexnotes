import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleModal, addToPlaylist, updateBinderArray } from '../actions';
import { Field, reduxForm } from 'redux-form';

class VideoModal extends Component {
  renderInput(props) {
    const { input } = props;
    return <input {...input} className="save-title-input form-control" />;
  }

  setName(values) {
    this.props.addToPlaylist(
      this.props.videoLink,
      values.title,
      this.props.binderTabPageIds
    );
    this.props.toggleModal(this.props.addVideoModalStyle);
    this.props.reset();
  }

  render() {
    return (
      <div
        style={this.props.addVideoModalStyle}
        className="add-modal-container"
      >
        <div className="add-modal">
          <h6>Enter video name: </h6>
          <form onSubmit={this.props.handleSubmit(this.setName.bind(this))}>
            <Field name="title" component={this.renderInput} />
            <div className="btn-wrapper">
              <button className="save btn green darken-3">Save</button>
              <button
                type="button"
                onClick={() => {
                  this.props.toggleModal(this.props.addVideoModalStyle);
                }}
                className="btn red darken-1"
              >
                Don't Save
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    url: state.url,
    addVideoModalStyle: state.video.addVideoModal,
    binderTabPageIds: state.interface,
    videoLink: state.video.videoLink
  };
}

VideoModal = reduxForm({
  form: 'add-video'
})(VideoModal);

export default connect(mapStateToProps, {
  toggleModal,
  addToPlaylist,
  updateBinderArray
})(VideoModal);
