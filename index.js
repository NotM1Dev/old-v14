const { Client, GatewayIntentBits } = require("discord.js");
const { CommandKit } = require("commandkit");

require("dotenv/config");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ],
});

new CommandKit({
    client,
    commandsPath: `${__dirname}/src/commands`,
    eventsPath: `${__dirname}/src/events`,
});

client.login(process.env.TOKEN);
