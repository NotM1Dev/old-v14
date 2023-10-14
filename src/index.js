const { Client, GatewayIntentBits } = require('discord.js');
const { CommandKit } = require('commandkit');

require('dotenv/config');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates
    ],
});

new CommandKit({
    client,
    commandsPath: `${__dirname}/commands`,
    eventsPath: `${__dirname}/events`,

    devGuildIds: ['YOUR_DEV_GUILD_ID'],
    devUserIds: ['YOUR_USER_ID']
});

module.exports = client;
client.login(process.env.TOKEN);