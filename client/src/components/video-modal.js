import React, { Component } from 'react';
import '../assets/css/video-add-modal.css';
import { connect } from 'react-redux';
import { toggleModal, addToPlaylist } from '../actions';
import { Field, reduxForm } from 'redux-form';

class VideoModal extends Component {
    renderInput() {
        return (
            <input  className="save-title-input form-control"/>
        );
    }
    render () {
        return(
            <div style={this.props.deleteModalStyle} className="add-modal-container row">
                <div className="add-modal">
                    <h4>Save video name: </h4>
                    <Field name="title" component={this.renderInput}/>
                    <button onClick={ 
                        () => {
                            this.props.addToPlaylist(this.props.pastedVideoUrl, this.props.binderTabPageIds)
                            this.props.toggleModal(this.props.deleteModalStyle)
                        } 
                        } className="save btn btn-success">Save Video</button>
                    <button onClick={ 
                        () => { 
                            this.props.toggleModal(this.props.deleteModalStyle)
                        }
                         } className="btn btn-primary">Go back</button>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        url: state.url,
        deleteModalStyle: state.video.deleteModal,
        binderTabPageIds: state.interface,
        pastedVideoUrl: state.videoResults.videoLink
    }
}

VideoModal = reduxForm({
    form: 'add-video'
})(VideoModal);

export default connect(mapStateToProps, { toggleModal, addToPlaylist })(VideoModal);