const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref:'thought',
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user',
            },
        ],
        username: {
            type: String,
            required: [true, 'Please provide a username'],
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            get: obfuscate,
            required: [true, 'Please provide email'],
            match: [
                /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
        'Please provide valid email'
            ],
            unique: true,
        },
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

module.exports = model('user', userSchema);