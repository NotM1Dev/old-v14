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

    devGuildIds: ['1161677195031347280'], // <- Your dev guild id (or multiple for each dev server)
    devUserIds: ['997191161699631104'] // <- Your user id (and any others on your team)
});

module.exports = client;
client.login(process.env.TOKEN);