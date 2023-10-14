const levelModel = require('../../models/Level');

function xpToLevel(level) {
    if (level === 0) return 50;
    else return level * 100;
}

/**
 * @param {import('discord.js').Message} message 
 */
module.exports = async (message) => {
    const { guild, author } = message;
    if (!guild || author.bot || author.system) return;

    const xpGain = Math.floor(Math.random() * 11) + 10;
    const user = await levelModel.findOne({ guildId: guild.id, userId: author.id });

    if (user) {
        user.xp += xpGain;

        if (user.xp > xpToLevel(user.level)) {
            user.xp = 0;
            user.level++;

            message.reply(`You leveled up to level ${user.level}!`);
        }

        await user.save().catch(console.error);
    } else {
        new levelModel({ guildId: guild.id, userId: author.id, xp: xpGain }).save().catch(console.error);
    }
}