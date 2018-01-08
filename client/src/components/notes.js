import React, {Component} from 'react';
import axios from 'axios';
import { Editor, getEventRange, getEventTransfer } from 'slate-react';
import { Block, Value } from 'slate';
import { isKeyHotkey } from 'is-hotkey';

import isImage from 'is-image'
import isUrl from 'is-url'

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

// UNDO AND REDO

const ToolbarButton = props => (
    <span className="button" onMouseDown={props.onMouseDown}>
    <span className="material-icons">{props.icon}</span>
  </span>
)

// LINKS

function wrapLink(change, href) {
    change.wrapInline({
        type: 'link',
        data: { href }
    });

    change.collapseToEnd()
}

function unwrapLink(change) {
    change.unwrapInline('link')
}

// IMAGES

function insertImage(change, src, target) {
    if (target) {
        change.select(target)
    }

    change.insertBlock({
        type: 'image',
        isVoid: true,
        data: { src }
    })
}

const schema = {
    document: {
        last: { types: ['paragraph'] },
        normalize: (change, reason, { node, child }) => {
            switch (reason) {
                case 'last_child_type_invalid': {
                    const paragraph = Block.create('paragraph')
                    return change.insertNodeByKey(node.key, node.nodes.size, paragraph)
                }
            }
        }
    }
};

// CLASS COMPONENT

class Notes extends Component {

    state = {
        value: initialValue
    };

    onChange = ({ value }) => {
        if (value.document !== this.state.value.document) {
            const content = JSON.stringify(value.toJSON());
            localStorage.setItem('content', content)
        }

        this.setState({ value });
    };

    // RICH TEXT TOOLBAR

    hasMark = (type) => {
        const { value } = this.state;
        return value.activeMarks.some(mark => mark.type === type)
    };

    hasBlock = (type) => {
        const { value } = this.state;
        return value.blocks.some(node => node.type === type)
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

    // UNDO AND REDO

    onClickRedo = (event) => {
        event.preventDefault()
        const { value } = this.state
        const change = value.change().redo()
        this.onChange(change)
    };

    onClickUndo = (event) => {
        event.preventDefault()
        const { value } = this.state
        const change = value.change().undo()
        this.onChange(change)
    };

    // LINKS

    hasLinks = () => {
        const { value } = this.state;
        return value.inlines.some(inline => inline.type === 'link')
    };

    onClickLink = (event) => {
        event.preventDefault();
        const { value } = this.state;
        const hasLinks = this.hasLinks();
        const change = value.change();

        if (hasLinks) {
            change.call(unwrapLink)
        }

        else if (value.isExpanded) {
            const href = window.prompt('Enter the URL of the link:');
            change.call(wrapLink, href)
        }

        else {
            const href = window.prompt('Enter the URL of the link:');
            const text = window.prompt('Enter the text for the link:');
            change
                .insertText(text)
                .extend(0 - text.length)
                .call(wrapLink, href)
        }

        this.onChange(change)
    };

    onLinkPaste = (event, change) => {
        if (change.value.isCollapsed) return

        const transfer = getEventTransfer(event)
        const { type, text } = transfer
        if (type != 'text' && type != 'html') return
        if (!isUrl(text)) return

        if (this.hasLinks()) {
            change.call(unwrapLink)
        }

        change.call(wrapLink, text)
        return true
    };

    // SEARCH HIGHLIGHTING

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

    // IMAGES

    onClickImage = (event) => {
        event.preventDefault()
        const src = window.prompt('Enter the URL of the image:')
        if (!src) return

        const change = this.state.value
            .change()
            .call(insertImage, src)

        this.onChange(change)
    };

    onDropOrPaste = (event, change, editor) => {
        const target = getEventRange(event, change.value)
        if (!target && event.type === 'drop') return

        const transfer = getEventTransfer(event)
        const { type, text, files } = transfer

        if (type === 'files') {
            for (const file of files) {
                const reader = new FileReader()
                const [ mime ] = file.type.split('/')
                if (mime !== 'image') continue

                reader.addEventListener('load', () => {
                    editor.change((c) => {
                        c.call(insertImage, reader.result, target)
                    })
                })

                reader.readAsDataURL(file)
            }
        }

        if (type === 'text') {
            if (!isUrl(text)) return
            if (!isImage(text)) return
            change.call(insertImage, text, target)
        }
    };

    // ALL

    renderMark = (props) => {
        const { children, mark } = props;
        switch (mark.type) {
            case 'highlight': return <span style={{ backgroundColor: '#FFFF00' }}>{children}</span>;
            case 'bold': return <strong>{children}</strong>;
            case 'code': return <code>{children}</code>;
            case 'italic': return <em>{children}</em>;
            case 'underlined': return <u>{children}</u>
        }
    };

    renderNode = (props) => {
        const { attributes, children, node, isSelected } = props;
        switch (node.type) {
            case 'block-quote': return <blockquote {...attributes}>{children}</blockquote>;
            case 'bulleted-list': return <ul {...attributes}>{children}</ul>;
            case 'heading-one': return <h1 {...attributes}>{children}</h1>;
            case 'heading-two': return <h2 {...attributes}>{children}</h2>;
            case 'list-item': return <li {...attributes}>{children}</li>;
            case 'numbered-list': return <ol {...attributes}>{children}</ol>;
            case 'link': {
                const { data } = node
                const href = data.get('href')
                return <a {...attributes} href={href}>{children}</a>
            }
            case 'image': {
                const src = node.data.get('src');
                const className = isSelected ? 'active' : null;
                const style = { display: 'block' };
                return (
                    <img src={src} className={className} style={style} {...attributes} />
                )
            }
        }
    };

    toolbar = () => {
        return (
            <div className="toolbar">
                <ToolbarButton icon="undo" onMouseDown={this.onClickUndo} />
                <ToolbarButton icon="redo" onMouseDown={this.onClickRedo} />
                {this.renderMarkButton('bold', 'format_bold')}
                {this.renderMarkButton('italic', 'format_italic')}
                {this.renderMarkButton('underlined', 'format_underlined')}
                {this.renderMarkButton('code', 'code')}
                {this.renderBlockButton('heading-one', 'looks_one')}
                {this.renderBlockButton('heading-two', 'looks_two')}
                {this.renderBlockButton('block-quote', 'format_quote')}
                {this.renderBlockButton('numbered-list', 'format_list_numbered')}
                {this.renderBlockButton('bulleted-list', 'format_list_bulleted')}
                <span className="button" onMouseDown={this.onClickLink} data-active={this.hasLinks}>
                    <span className="material-icons">link</span>
                </span>
                <span className="button" onMouseDown={this.onClickImage}>
                    <span className="material-icons">image</span>
                </span>
                <div className="search-box">
                    <input

                        placeholder="Search keywords..."
                        onChange={this.onInputChange}
                    />
                </div>

            </div>
        )
    };

    render() {
        return (
            <div className="notes-component">

                {this.toolbar()}
                <Editor
                    className="editor"
                    style="overflow: scroll"
                    placeholder="Enter notes..."
                    value={this.state.value}
                    onChange={this.onChange}
                    onKeyDown={this.onKeyDown}
                    schema={schema}
                    onDrop={this.onDropOrPaste}
                    onPaste={this.onDropOrPaste}
                    onLinkPaste={this.onPaste}
                    renderNode={this.renderNode}
                    renderMark={this.renderMark}
                    spellCheck
                />
            </div>
        );
    }
}

export default Notes;