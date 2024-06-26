const { User, Thought } = require('../models');

module.exports = {
    // Get all users
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Get a single user
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({_id: req.params.userId})
            .select('-__v');

            if (!user) {
                return res.status(404).json({ message: 'No user with that ID found' });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //Create a new user
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //Update a user
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true }
                );

            if (!user) {
                return res.status(404).json({ message: 'No user with that ID found' });
            }
            res.json(user);
            
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //Delete a user and associated thoughts
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId });

            if (!user) {
                return res.status(404).json({ message: 'No user with that ID found'});
            }

            await Thought.deleteMany({ username: { $in: user.thoughts }});
            res.json({message: 'User and thoughts deleted!'})
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //Add a friend
    async addFriend(req, res) {
        try {
            const user = await User.findByIdAndUpdate(
                req.params.userId,
                { $addToSet: { friend: req.params.friendId } },
                { runValidators: true, new: true }
            );

            if (!user) {
                return res.status(404).json({ message: 'No user with that ID found' });
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //Remove a friend
    async removeFriend(req, res) {
        try {
            const user = await User.findByIdAndUpdate(
                req.params.userId,
                { $pull: {friend: req.params.friendId } },
                { runValidators: true, new: true }
            );
            
            if (!user) {
                return res.status(404).json({ message: 'No user with that ID found' });
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};