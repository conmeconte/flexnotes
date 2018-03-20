import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';
import { Editor, getEventRange, getEventTransfer } from 'slate-react';
import { Block, Value } from 'slate';
import { isKeyHotkey } from 'is-hotkey';
import { connect } from 'react-redux';
import { saveNotes, notesUpdated, autoSaveNotes } from '../actions';
import isImage from 'is-image'
import isUrl from 'is-url'

import '../assets/css/notes.css';

const DEFAULT_NODE = 'paragraph';

const isBoldHotkey = isKeyHotkey('mod+b');
const isItalicHotkey = isKeyHotkey('mod+i');
const isUnderlinedHotkey = isKeyHotkey('mod+u');
const isCodeHotkey = isKeyHotkey('mod+`');
const isTabHotkey = isKeyHotkey('tab');

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
                                text: ''
                            }
                        ]
                    }
                ]
            }
        ]
    }
});

// --------------------------- EMOJIS  ---------------------------

const EMOJIS = [
    '😃',
    '😬',
    '😂',
    '😎',
    '🤯',
    '😍',
    '👍',
    '👌',
    '💋',
    '❤️',
    '⁉️',
    '💩'
];

const noop = e => e.preventDefault();

// --------------------------- UNDO AND REDO  ---------------------------

const ToolbarButton = props => (
    <span title={props.icon} className="styleSquare" onMouseDown={props.onMouseDown}>
        <span className="material-icons notesIcons">{props.icon}</span>
    </span>
);

// --------------------------- LINKS  ---------------------------

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

// --------------------------- IMAGES  ---------------------------

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
                    const paragraph = Block.create('paragraph');
                    return change.insertNodeByKey(node.key, node.nodes.size, paragraph)
                }
            }
        }
    }
};

// --------------------------- CLASS COMPONENT  ---------------------------

class Notes extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: initialValue,
            save: true,
            isReadOnly: false
        };

        this.submitNotes = this.submitNotes.bind(this);
        this.submitNotes = _.debounce(this.submitNotes, 2000);
        this.notesChange = this.notesChange.bind(this);
        // this.notesChange = _.debounce(this.notesChange, 1000);
        this.onChange = this.onChange.bind(this);

        this.toggleReadOnly = this.toggleReadOnly.bind(this);
    }

    onChange({ value }) {
        this.setState({ value, save: false });
        this.notesChange();
        this.submitNotes();
    };

    notesChange(){
        if(this.props.interface_obj.save_notes === true){
            this.props.notesUpdated();
        }
    }

    submitNotes() {
        let { interface_obj } = this.props;
        const { value } = this.state;
        
        // const content = JSON.stringify(value.toJSON());
        this.props.autoSaveNotes(value, interface_obj);
        // this.setState({
        //     ...value,
        //     save: true
        // })
        // axios.put('/api/note', {
        //     document: { content },
        //     binderID: interface_obj.binder_id,
        //     tabID: interface_obj.tab_id,
        //     pageID: interface_obj.page_id
        // }).then(
        //     this.setState({
        //         ...value,
        //         save: true
        //     })
        // ).catch((err) => {
        //     console.log("not logged in: ", err);
        //     window.location = '/';
        // })
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
            if (tab_arr_obj[tabIndex].page_arr_obj[pageIndex].hasOwnProperty("notes")) {
                const lastContent = JSON.parse(page_arr_obj[pageIndex].notes.document.content);
                this.setState({
                    value: Value.fromJSON(lastContent),
                    save: true
                })
            } else {
                this.setState({
                    value: initialValue,
                    save: true
                })
            }
        }
    }

    // componentDidUpdate(prevState){
    //     if(prevState.save !== this.state.save){
    //         if(this.state.save === false){
    //             this.props.notesUpdated();
    //         }
    //     }
    // }

    componentWillReceiveProps(nextProps, nextState) {
        
        // if(nextProps.interface_obj.save_notes !== this.props.interface_obj.save_notes){
        //     if(nextProps.interface_obj.save_notes === true && nextState.save === false){
        //         this.props.notesUpdated();
        //         const { value } = this.state;
        //         this.setState({
        //             //...value,
        //             save: true
        //         });
        //     }
        // }

        if (nextProps.interface_obj.page_id !== this.props.interface_obj.page_id) {
            if(this.props.interface_obj.save_notes === false){
                const { value } = this.state;
                //console.log('notes cwrp');
                this.props.saveNotes(value, this.props.interface_obj);
            }

            //this.props.notesUpdated();
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
                if (pageIndex !== null && tab_arr_obj[tabIndex].page_arr_obj[pageIndex].hasOwnProperty("notes")) {
                    const lastContent = JSON.parse(page_arr_obj[pageIndex].notes.document.content);
                    //console.log("NOTES LAST CONTENT:", lastContent.document.nodes["0"].nodes["0"].leaves["0"]);
                    this.setState({
                        value: Value.fromJSON(lastContent),
                        save: false
                    })
                } else {
                    this.setState({
                        value: initialValue,
                        save: false
                    })
                }
            }
        }
    }

    // --------------------------- RICH TEXT TOOLBAR  ---------------------------

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
        } else if (isTabHotkey(event)) {
            mark = 'tab';
            change.insertText("     ");
            return true
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

        // Handle everything but list buttons.
        if (type !== 'bulleted-list' && type !== 'numbered-list') {
            const isActive = this.hasBlock(type);
            const isList = this.hasBlock('list-item');

            if (isList) {
                change
                    .setBlock(isActive ? DEFAULT_NODE : type)
                    .unwrapBlock('bulleted-list')
                    .unwrapBlock('numbered-list')
            }

            else {
                change
                    .setBlock(isActive ? DEFAULT_NODE : type)
            }
        }

        // Handle the extra wrapping required for list buttons.
        else {
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
            <span onMouseDown={onMouseDown} data-active={isActive} title={type}>
                <span className="material-icons notesIcons colorCircles richText">{icon}</span>
            </span>
        )
    };

    renderFontButton = (type, fontStyle) => {
        const isActive = this.hasMark(type);
        const onMouseDown = event => this.onClickMark(event, type);

        return (
            <span onMouseDown={onMouseDown} data-active={isActive} title={type} className="fontStyleButton">
                <span>{fontStyle}</span>
            </span>
        )
    };

    renderBlockButton = (type, icon) => {
        const isActive = this.hasBlock(type);
        const onMouseDown = event => this.onClickBlock(event, type);

        return (
            <span className="styleSquare" title={type} onMouseDown={onMouseDown} data-active={isActive}>
                <span className="material-icons notesIcons">{icon}</span>
            </span>
        )
    };

    // --------------------------- UNDO AND REDO  ---------------------------

    onClickRedo = (event) => {
        event.preventDefault();
        const { value } = this.state;
        const change = value.change().redo();
        this.onChange(change)
    };

    onClickUndo = (event) => {
        event.preventDefault();
        const { value } = this.state;
        const change = value.change().undo();
        this.onChange(change)
    };

    // --------------------------- LINKS  ---------------------------

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

    onPaste = (event, change) => {
        if (change.value.isCollapsed) return;

        const transfer = getEventTransfer(event);
        const { type, text } = transfer;
        if (type !== 'text' && type !== 'html') return;
        if (!isUrl(text)) return;

        if (this.hasLinks()) {
            change.call(unwrapLink)
        }

        change.call(wrapLink, text);
        return true
    };

    // --------------------------- SEARCH HIGHLIGHTING  ---------------------------

    // onInputChange = (event) => {
    //     const { value } = this.state;
    //     const string = event.target.value;
    //     const texts = value.document.getTexts();
    //     const decorations = [];
    //
    //     texts.forEach((node) => {
    //         const { key, text } = node;
    //         const parts = text.split(string);
    //         let offset = 0;
    //
    //         parts.forEach((part, i) => {
    //             if (i !== 0) {
    //                 decorations.push({
    //                     anchorKey: key,
    //                     anchorOffset: offset - string.length,
    //                     focusKey: key,
    //                     focusOffset: offset,
    //                     marks: [{ type: 'highlight' }],
    //                 })
    //             }
    //
    //             offset = offset + part.length + string.length
    //         })
    //     });
    //
    //     const change = value.change().setValue({ decorations });
    //     this.onChange(change)
    // };

    // --------------------------- IMAGES  ---------------------------

    onClickImage = (event) => {
        event.preventDefault();
        const src = window.prompt('Enter the URL of the image:');
        if (!src) return;

        const change = this.state.value
            .change()
            .call(insertImage, src);

        this.onChange(change)
    };

    onDropOrPaste = (event, change, editor) => {
        const target = getEventRange(event, change.value);
        if (!target && event.type === 'drop') return;

        const transfer = getEventTransfer(event);
        const { type, text, files } = transfer;

        if (type === 'files') {
            for (const file of files) {
                const reader = new FileReader();
                const [mime] = file.type.split('/');
                if (mime !== 'image') continue;

                reader.addEventListener('load', () => {
                    editor.change((c) => {
                        c.call(insertImage, reader.result, target)
                    })
                });

                reader.readAsDataURL(file)
            }
        }

        if (type === 'text') {
            if (!isUrl(text)) return;
            if (!isImage(text)) return;
            change.call(insertImage, text, target)
        }
    };

    // --------------------------- READ ONLY  ---------------------------

    toggleReadOnly = () => {
        if (this.state.isReadOnly) {
            this.setState({
                isReadOnly: false
            });
        } else {
            this.setState({
                isReadOnly: true
            });
        }
    };

    // --------------------------- EMOJIS  ---------------------------

    onClickEmoji = (e, code) => {
        e.preventDefault();
        const { value } = this.state;
        const change = value.change();

        change
            .insertInline({
                type: 'emoji',
                isVoid: true,
                data: { code },
            })
            // .collapseToStartOfNextText()
            .focus();

        this.onChange(change)
    };

    // --------------------------- ALL  ---------------------------

    renderMark = (props) => {
        const { children, mark } = props;
        switch (mark.type) {
            case 'highlight': return <span style={{ backgroundColor: '#FFFF00' }}>{children}</span>;
            case 'bold': return <strong>{children}</strong>;
            case 'code': return <code>{children}</code>;
            case 'italic': return <em>{children}</em>;
            case 'underlined': return <u>{children}</u>;

            case 'header': return <span style={{ fontSize: '1.5em' }}>{children}</span>;

            case 'red': return <span style={{ color: '#FF0000' }}>{children}</span>;
            case 'orange': return <span style={{ color: '#FF7F00' }}>{children}</span>;
            case 'yellow': return <span style={{ color: '#FFFF00' }}>{children}</span>;
            case 'green': return <span style={{ color: '#00FF00' }}>{children}</span>;
            case 'blue': return <span style={{ color: '#0000FF' }}>{children}</span>;
            case 'purple': return <span style={{ color: '#9400D3' }}>{children}</span>;

            case 'arial': return <span style={{ fontFamily: 'Arial' }}>{children}</span>;
            case 'comic sans': return <span style={{ fontFamily: 'Comic Sans MS' }}>{children}</span>;
            case 'courier new': return <span style={{ fontFamily: 'Courier New' }}>{children}</span>;
            case 'impact': return <span style={{ fontFamily: 'Impact' }}>{children}</span>;
            case 'roboto': return <span style={{ fontFamily: 'Roboto' }}>{children}</span>;
            case 'times new roman': return <span style={{ fontFamily: 'Times New Roman' }}>{children}</span>;
        }
    };

    renderNode = (props) => {
        const { attributes, children, node, isSelected } = props;
        switch (node.type) {
            case 'block-quote': return <blockquote {...attributes}>{children}</blockquote>;
            case 'left': return <div style={{ textAlign: 'left' }}>{children}</div>;
            case 'center': return <div style={{ textAlign: 'center' }}>{children}</div>;
            case 'right': return <div style={{ textAlign: 'right' }}>{children}</div>;
            case 'justify': return <div style={{ textAlign: 'justify' }}>{children}</div>;

            case 'list-item': return <li {...attributes}>{children}</li>;
            case 'bulleted-list': return <ul className="notesUnorderedList" {...attributes}>{children}</ul>;
            case 'numbered-list': return <ol {...attributes}>{children}</ol>;
            case 'link': {
                const { data } = node;
                const href = data.get('href');
                return <a {...attributes} href={href} target="_blank" title="right-click on link to open">{children}</a>
            }
            case 'image': {
                const src = node.data.get('src');
                const className = isSelected ? 'active' : null;
                const style = { display: 'block' };
                return (
                    <img src={src} className={className} style={style} {...attributes} />
                )
            }
            case 'emoji': {
                const { data } = node
                const code = data.get('code')
                return (
                    <span
                        className={`emoji ${isSelected ? 'selected' : ''}`}
                        {...props.attributes}
                        contentEditable={false}
                        onDrop={noop}
                    >
                        {code}
                    </span>
                )
            }

        }
    };

    toolbar = () => {
        return (

            <div className="toolbar sixth-step">
                <div className="stylingButtons">
                    <ToolbarButton icon="undo" onMouseDown={this.onClickUndo} />
                    <ToolbarButton icon="redo" onMouseDown={this.onClickRedo} />
                    <span className="styleSquare" title="link" onMouseDown={this.onClickLink} data-active={this.hasLinks}>
                        <span className="material-icons notesIcons link">link</span>
                    </span>
                    <span className="styleSquare" title="image" onMouseDown={this.onClickImage}>
                        <span className="material-icons notesIcons image">image</span>
                    </span>
                    {this.renderBlockButton('left', 'format_align_left')}
                    {this.renderBlockButton('center', 'format_align_center')}
                    {this.renderBlockButton('right', 'format_align_right')}
                    {this.renderBlockButton('justify', 'format_align_justify')}
                    {this.renderBlockButton('numbered-list', 'format_list_numbered')}
                    {this.renderBlockButton('bulleted-list', 'format_list_bulleted')}

                    <span className="styleSquare" title="read only" onClick={this.toggleReadOnly}>
                        <span className="material-icons notesIcons">{this.state.isReadOnly ? 'lock' : 'lock_open'}</span>
                    </span>
                </div>

                <div className="stylingButtons secondRow">
                    <div className="font-dropdown">
                        <span className="material-icons notesIcons richText" title="font">font_download</span>
                        <div className="font-styles">
                            <p className="fonts arial">{this.renderFontButton('arial', 'Arial')}</p>
                            <p className="fonts comic">{this.renderFontButton('comic sans', 'Comic Sans')}</p>
                            <p className="fonts courier">{this.renderFontButton('courier new', 'Courier New')}</p>
                            <p className="fonts impact">{this.renderFontButton('impact', 'Impact')}</p>
                            <p className="fonts roboto">{this.renderFontButton('roboto', 'Roboto')}</p>
                            <p className="fonts times">{this.renderFontButton('times new roman', 'Times New Roman')}</p>
                        </div>
                    </div>

                    <div className="hoverOptions">
                        <span className="hoverDropbtn" title="font color"><i className="material-icons fontColorIcon notesIcons">format_color_text</i></span>
                        <div className="fontColor-options">
                            <p className="fontColor redFont">{this.renderMarkButton('red', 'lens')}</p>
                            <p className="fontColor orangeFont">{this.renderMarkButton('orange', 'lens')}</p>
                            <p className="fontColor yellowFont">{this.renderMarkButton('yellow', 'lens')}</p>
                            <p className="fontColor greenFont">{this.renderMarkButton('green', 'lens')}</p>
                            <p className="fontColor blueFont">{this.renderMarkButton('blue', 'lens')}</p>
                            <p className="fontColor violetFont">{this.renderMarkButton('purple', 'lens')}</p>
                        </div>
                    </div>

                    {this.renderMarkButton('highlight', 'edit')}
                    {this.renderMarkButton('bold', 'format_bold')}
                    {this.renderMarkButton('italic', 'format_italic')}
                    {this.renderMarkButton('underlined', 'format_underlined')}
                    {this.renderMarkButton('header', 'format_size')}
                    {this.renderMarkButton('code', 'code')}
                    {this.renderBlockButton('block-quote', 'format_quote')}

                    {/*<input*/}
                        {/*className="search-input keyword"*/}
                        {/*placeholder="Search keywords..."*/}
                        {/*onChange={this.onInputChange}*/}
                    {/*/>*/}

                    <div className="hoverOptions">
                        <span className="hoverDropbtn" title="emoji"><i className="material-icons emojiIcon notesIcons">insert_emoticon</i></span>
                        <div className="emoji-options">
                            <p className="emojis">{EMOJIS.map((emoji, i) => {
                                const onMouseDown = e => this.onClickEmoji(e, emoji)
                                return (
                                    <span key={i} className="button" onMouseDown={onMouseDown}>
                                        <span className="material-icons textAreaEmoji">{emoji}</span>
                                    </span>
                                )
                            })}</p>
                        </div>
                    </div>
                </div>
                <h6 className="saveNotes" >{this.state.save ? "Notes saved" : ""}</h6>
            </div>
        )
    };

    render() {
        return (
            <div className="text-editor">
                <div className='notes-component-toolbar'>{this.toolbar()}</div>

                <div className="notes-component fifth-step">
                    <Editor
                        className="editor"
                        style={{ overflowY: scroll }}
                        style={{ fontFamily: this.fontStyle}}
                        placeholder="Enter notes..."
                        value={this.state.value}
                        onChange={this.onChange}
                        onKeyDown={this.onKeyDown}
                        schema={schema}
                        onDrop={this.onDropOrPaste}
                        onPaste={this.onDropOrPaste}
                        onPaste={this.onPaste}
                        renderNode={this.renderNode}
                        renderMark={this.renderMark}
                        readOnly={this.state.isReadOnly}
                        spellCheck
                    />
                </div>
            </div>

        );
    }
}

function mapStateToProps(state) {
    return {
        interface_obj: state.interface,
        binderObj: state.binder.binderObj
    }
}

export default connect(mapStateToProps, { saveNotes, notesUpdated, autoSaveNotes })(Notes);

