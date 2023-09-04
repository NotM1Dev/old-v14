const { Client, GatewayIntentBits } = require("discord.js");

const loadEvents = require("./src/handlers/loadEvents");

require("dotenv/config");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ],
});

client.login(process.env.TOKEN).then(() => {
    loadEvents(client);
});