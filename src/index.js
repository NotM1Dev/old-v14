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
    // validationsPath: `${__dirname}/validations`,
    commandsPath: `${__dirname}/commands`,
    eventsPath: `${__dirname}/events`,
});

module.exports = client;
client.login(process.env.TOKEN);