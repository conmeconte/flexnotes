import React, {Component} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../assets/css/notes.css';

class Notes extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: ''
        };

        this.modules = {
            toolbar: [
                [{ 'size': ['small', false, 'large', 'huge'] }],
                [{ 'font': [] }],
                ['bold', 'italic', 'underline','strike'],
                [{ 'color': [] }, { 'background': [] }],
                [{ 'align': [] }],
                [{'list': 'ordered'}, {'list': 'bullet'}],
                [{ 'indent': '-1'}, { 'indent': '+1' }],
                [{ 'script': 'sub'}, { 'script': 'super' }, 'formula'],
                ['link', 'image', 'video'],
            ]
        };

        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(value) {
        this.setState({ text: value })
        console.log(value);
    }

    render() {

        return (
            <div className="notesPanel">
                <h3>Notes Panel</h3>
                <ReactQuill modules={this.modules}
                            value={this.state.text}
                            onChange={this.handleChange} />
            </div>
        )
    }
}

export default Notes;