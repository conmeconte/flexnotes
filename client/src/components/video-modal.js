import React, { Component } from 'react';
// import '../assets/css/video-add-modal.css';
import { connect } from 'react-redux';
import { toggleModal, addToPlaylist, updateBinderArray } from '../actions';
import { Field, reduxForm } from 'redux-form';

class VideoModal extends Component {
    renderInput(props) {
        const { label, input, meta: { touched, error }  } = props;
        console.log('INPUT: ', input);

        return (
                <input {...input} className="save-title-input form-control"/>
        );
    }

    setName(values){
        console.log('Values:', values);
        this.props.addToPlaylist(this.props.videoLink, values.title, this.props.binderTabPageIds);
        this.props.toggleModal(this.props.addVideoModalStyle);
    }

    render () {
        return(
            <div style={this.props.addVideoModalStyle} className="add-modal-container">
                <div className="add-modal">
                        <h4>Enter video name: </h4>
                        <form onSubmit={this.props.handleSubmit(this.setName.bind(this))}>
                            <Field name="title" component={this.renderInput}/>
                            <button className="save btn btn-success">Continue</button>
                <button type="button" onClick={ 
                    () => { 
                        this.props.toggleModal(this.props.addVideoModalStyle)
                    }
                    } className="btn btn-primary">Go back</button>
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
        // pastedVideoUrl: state.videoResults.videoLink,
        videoLink: state.video.videoLink
    }
}

VideoModal = reduxForm({
    form: 'add-video'
})(VideoModal);


export default connect(mapStateToProps, { toggleModal, addToPlaylist, updateBinderArray })(VideoModal);