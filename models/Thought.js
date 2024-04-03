const { Schema, model } = require('mongoose');

//Schema that makes up a throught
const thoughtSchema = new Schema(
    {
        thoughtText: {type: String, required: true, minlength: 1, maxlength: 280},
        createdAt: {type: Date, default: Date.now, get: (createdAtVal) => createdAtVal.toLocalString()},
        username: {type: Schema.Types.ObjectId, ref: 'user'},
        reactions: [{type: Schema.Types.ObjectId, ref: 'reaction'}],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false,
    }
);

//Create a virtual property 'reactionCount' that retrieves the length of the throught's reactions array field on query.
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

//Initialize our Thought model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;