import React, {Component} from 'react';
import { Editor } from 'slate-react';
import { Value } from 'slate';

import '../assets/css/notes.css';

const initialValue = Value.fromJSON({
    document: {
        nodes: [
            {
                kind: 'block',
                type: 'paragraph',
                nodes: [
                    {
                        kind: 'text',
                        leaves: [
                            {
                                text: 'A line of text in a paragraph.'
                            }
                        ]
                    }
                ]
            }
        ]
    }
})

class Notes extends Component {
    state = {
        value: initialValue
    };

    onChange = ({ value }) => {
        this.setState({ value })
    };

    render() {
        return (
            <Editor
                value={this.state.value}
                onChange={this.onChange}
            />
        )
    }
}

export default Notes;