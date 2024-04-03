const { Schema, model } = require('mongoose');

//Schema to create User model
const userSchema = new Schema(
    {
        usernane: { type: String, unique: true, required: true, trimmed: true},
        email: { type: String, unique: true, required: true},
        thoughts: [{ type: Schema.Types.ObjectId, ref: 'thoughts'}],
        friends: [{ type: Schema.Types.ObjectId, ref: 'user'}],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

//Create a virtual property 'thoughtsCount' that gets the amount of thoughts per user
userSchema.virtual('thoughtsCount').get(function () {
    return this.thoughts.length;
});

//Initialize our User model
const User = model('user', userSchema);

module.exports = User;