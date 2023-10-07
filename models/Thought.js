const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: [true, 'Please provide thought text'],
            minlength: 1,
            maxlength: 280
        },
        username: {
            type: String,
            required: [true, 'Please provide a username']
        }
    }
)