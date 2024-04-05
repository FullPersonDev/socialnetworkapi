const connection = require('../config/connection');
const { User, Thought } = require('../models');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');
    //Delete the collections if they exist
    let thoughtsCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
    if (thoughtsCheck) {
        await connection.dropCollection('thoughts');
    }

    let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
    if (userCheck.length) {
        await connection.dropCollection('users')
    }

    //The raw data for the seed
    const users = [
        { username: 'messi', email: 'messi@gmail.com' },
        { username: 'ronaldo', email: 'ronaldo@gmail.com' },
        { username: 'maradona', email: 'maradona@gmail.com' },
        { username: 'embappe', email: 'embappe@gmail.com' },
        { username: 'beckham', email: 'beckham@gmail.com' },
    ];

    const thoughts = [
        {
            thoughtText: "I had a cool thought of winning the world cup",
            username: "messi",
            reactions: [
                {
                    reactionBody: "Wow, that would be amazing",
                    username: 'ronaldo'
                },
            ],
        },
        {
            thoughtText: "I did win the world cup",
            username: "maradona",
            reactions: [
                {
                    reactionBody: "I did too!",
                    username: 'embappe'
                },
            ],
        },
        {
            thoughtText: "I wish a foul was called, it really was a foul.",
            username: "ronaldo",
            reactions: [
                {
                    reactionBody: "Sorry my friend",
                    username: 'messi'
                },
            ],
        },
        {
            thoughtText: "Bend it like me!",
            username: "beckham",
            reactions: [
                {
                    reactionBody: "You did a great job",
                    username: 'embappe'
                },
            ],
        },
    ];

    //Inserting new seed data into collections
    await User.collection.insertMany(users);
    await Thought.collection.insertMany(thoughts);

    //Loop through the saved data and display it on the console
    console.table(users);
    console.table(thoughts);
    console.info('Seeding completed !');
    process.exit(0);
});