const { Schema, model } = require('mongoose');

//Schema to create User model
const userSchema = new Schema(
    {
        usernane: { type: String, unique: true, required: true, trimmed: true},
        email: { type: String, unique: true, required: true},
        thought: [{ type: Schema.Types.ObjectId, ref: 'thought'}],
        friend: [{ type: Schema.Types.ObjectId, ref: 'user'}],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

//Create a virtual property 'friendCount' that gets the amount of friends per user
userSchema.virtual('friendCount').get(function () {
    return this.friend.length;
});

//Initialize our User model
const User = model('user', userSchema);

module.exports = User;