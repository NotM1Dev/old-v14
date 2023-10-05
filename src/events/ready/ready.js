const mongoose = require('mongoose');

module.exports = (client) => {
    console.log(`${client.user.tag} is online.`);

    mongoose.connect(process.env.MONGODB)
        .then(() => console.log('MongoDB connected'))
        .catch(console.error);
}