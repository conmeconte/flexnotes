import React, {Component} from 'react';
import { Editor } from 'slate-react';
import { Value } from 'slate';
import { isKeyHotkey } from 'is-hotkey';

import '../assets/css/notes.css';

const DEFAULT_NODE = 'paragraph';

const isBoldHotkey = isKeyHotkey('mod+b');
const isItalicHotkey = isKeyHotkey('mod+i');
const isUnderlinedHotkey = isKeyHotkey('mod+u');
const isCodeHotkey = isKeyHotkey('mod+`');


const existingValue = JSON.parse(localStorage.getItem('content'));
const initialValue = Value.fromJSON(existingValue || {
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
});

class Notes extends Component {

    state = {
        value: initialValue
    };

    hasMark = (type) => {
        const { value } = this.state;
        return value.activeMarks.some(mark => mark.type === type)
    };

    hasBlock = (type) => {
        const { value } = this.state;
        return value.blocks.some(node => node.type === type)
    };

    onChange = ({ value }) => {
        if (value.document !== this.state.value.document) {
            const content = JSON.stringify(value.toJSON());
            localStorage.setItem('content', content)
        }

        this.setState({ value })
    };

    onKeyDown = (event, change) => {
        let mark;

        if (isBoldHotkey(event)) {
            mark = 'bold'
        } else if (isItalicHotkey(event)) {
            mark = 'italic'
        } else if (isUnderlinedHotkey(event)) {
            mark = 'underlined'
        } else if (isCodeHotkey(event)) {
            mark = 'code'
        } else {
            return
        }

        event.preventDefault();
        change.toggleMark(mark);
        return true
    };

    onClickMark = (event, type) => {
        event.preventDefault();
        const { value } = this.state;
        const change = value.change().toggleMark(type);
        this.onChange(change)
    };

    onClickBlock = (event, type) => {
        event.preventDefault();
        const { value } = this.state;
        const change = value.change();
        const { document } = value;

        if (type !== 'bulleted-list' && type !== 'numbered-list') {
            const isActive = this.hasBlock(type);
            const isList = this.hasBlock('list-item');

            if (isList) {
                change
                    .setBlock(isActive ? DEFAULT_NODE : type)
                    .unwrapBlock('bulleted-list')
                    .unwrapBlock('numbered-list')
            } else {
                change
                    .setBlock(isActive ? DEFAULT_NODE : type)
            }
        } else {
            const isList = this.hasBlock('list-item');
            const isType = value.blocks.some((block) => {
                return !!document.getClosest(block.key, parent => parent.type === type)
            });

            if (isList && isType) {
                change
                    .setBlock(DEFAULT_NODE)
                    .unwrapBlock('bulleted-list')
                    .unwrapBlock('numbered-list')
            } else if (isList) {
                change
                    .unwrapBlock(type === 'bulleted-list' ? 'numbered-list' : 'bulleted-list')
                    .wrapBlock(type)
            } else {
                change
                    .setBlock('list-item')
                    .wrapBlock(type)
            }
        }

        this.onChange(change)
    };

    onInputChange = (event) => {
        const { value } = this.state;
        const string = event.target.value;
        const texts = value.document.getTexts();
        const decorations = [];

        texts.forEach((node) => {
            const { key, text } = node;
            const parts = text.split(string);
            let offset = 0;

            parts.forEach((part, i) => {
                if (i !== 0) {
                    decorations.push({
                        anchorKey: key,
                        anchorOffset: offset - string.length,
                        focusKey: key,
                        focusOffset: offset,
                        marks: [{ type: 'highlight' }],
                    })
                }

                offset = offset + part.length + string.length
            })
        });

        const change = value.change().setValue({ decorations });
        this.onChange(change)
    };

    render() {
        return (
            <div className="notes-component">
                <h1 className="notesTitle">Notes</h1>
                {this.toolbar()}
                <Editor
                    className="editor"
                    placeholder="Enter notes..."
                    value={this.state.value}
                    onChange={this.onChange}
                    onKeyDown={this.onKeyDown}
                    renderNode={this.renderNode}
                    renderMark={this.renderMark}
                    spellCheck
                />
            </div>
        )
    }

    toolbar = () => {
        return (
            <div className="toolbar">
                {this.renderMarkButton('bold', 'format_bold')}
                {this.renderMarkButton('italic', 'format_italic')}
                {this.renderMarkButton('underlined', 'format_underlined')}
                {this.renderMarkButton('code', 'code')}
                {this.renderBlockButton('heading-one', 'looks_one')}
                {this.renderBlockButton('heading-two', 'looks_two')}
                {this.renderBlockButton('block-quote', 'format_quote')}
                {this.renderBlockButton('numbered-list', 'format_list_numbered')}
                {this.renderBlockButton('bulleted-list', 'format_list_bulleted')}
                <input
                    className="search-box"
                    placeholder="Search keywords..."
                    onChange={this.onInputChange}
                />
            </div>
        )
    };

    renderMarkButton = (type, icon) => {
        const isActive = this.hasMark(type);
        const onMouseDown = event => this.onClickMark(event, type);

        return (
            <span className="button" onMouseDown={onMouseDown} data-active={isActive}>
            <span className="material-icons">{icon}</span>
            </span>
        )
    };

    renderBlockButton = (type, icon) => {
        const isActive = this.hasBlock(type);
        const onMouseDown = event => this.onClickBlock(event, type);

        return (
            <span className="button" onMouseDown={onMouseDown} data-active={isActive}>
            <span className="material-icons">{icon}</span>
            </span>
        )
    };

    renderNode = (props) => {
        const { attributes, children, node } = props;
        switch (node.type) {
            case 'block-quote': return <blockquote {...attributes}>{children}</blockquote>;
            case 'bulleted-list': return <ul {...attributes}>{children}</ul>;
            case 'heading-one': return <h1 {...attributes}>{children}</h1>;
            case 'heading-two': return <h2 {...attributes}>{children}</h2>;
            case 'list-item': return <li {...attributes}>{children}</li>;
            case 'numbered-list': return <ol {...attributes}>{children}</ol>
        }
    };

    renderMark = (props) => {
        const { children, mark } = props;
        switch (mark.type) {
            case 'highlight': return <span style={{ backgroundColor: '#FFFF00' }}>{children}</span>;
            case 'bold': return <strong>{children}</strong>;
            case 'code': return <code>{children}</code>;
            case 'italic': return <em>{children}</em>;
            case 'underlined': return <u>{children}</u>
        }
    }
}

export default Notes;