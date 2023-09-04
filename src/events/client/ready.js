const { Client } = require("discord.js");

module.exports = {
    name: "ready",

    /**
     * 
     * @param {Client} client 
     */

    run: (client) => {
        console.log(`Logged in — ${client.user.tag}`);
    }
}