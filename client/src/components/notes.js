import React, {Component} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../assets/css/notes.css';

class Notes extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: ''
        }

        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(value) {
        this.setState({ text: value })
        console.log(value);
    }

    render() {

        return (
            <div className="notesPanel">
                <ReactQuill value={this.state.text}
                        onChange={this.handleChange} />
            </div>
        )
    }
}

export default Notes;