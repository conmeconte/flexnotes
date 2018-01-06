const mongoose = require('mongoose');
const { Schema } = mongoose;

/* Notes Schema */

const notesNode = new Schema({
    kind: {type: String, default: "block"},
    type: {type: String, default: "paragraph"},
    nodes: [
        {
            kind: {type: String, default: "text"},
            leaves: [
                {
                    text: {type: String, default: "A line of text in a paragraph."}
                }
            ]
        }
    ]
});

module.exports = notesNode;