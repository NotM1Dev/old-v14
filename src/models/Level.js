const { model, Schema } = require('mongoose');

module.exports = model('levels', new Schema({
    userId: {
        type: String,
        required: true,
    },

    guildId: {
        type: String,
        required: true,
    },

    level: {
        type: Number,
        default: 0
    },

    xp: {
        type: Number,
        default: 0
    }
}));