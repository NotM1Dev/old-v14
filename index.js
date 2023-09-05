const { Client, GatewayIntentBits, Collection } = require("discord.js");

const loadEvents = require("./src/handlers/loadEvents");
const loadCommands = require("./src/handlers/loadCommands");

require("dotenv/config");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ],
});

client.commands = new Collection();

client.login(process.env.TOKEN).then(() => {
    loadEvents(client);
    loadCommands(client);
});
