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
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            get: (createdAt) => 
            formatDate(
                Intl.DateTimeFormate('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                }).format(new Date(createdAt))
            ),
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

module.exports = model('thought', thoughtSchema);