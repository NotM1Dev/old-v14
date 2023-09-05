const fs = require("fs");

module.exports = (client) => {
    const commands = [];
    const folders = fs.readdirSync("./src/commands");

    for (const folder of folders) {
        const files = fs.readdirSync(`./src/commands/${folder}`).filter((x) => x.endsWith(".js"));

        for (const file of files) {
            const command = require(`../commands/${folder}/${file}`);

            if (!command.data || !command.run) {
                console.log(`Invalid command at ${file}`);
            }

            commands.push(command.data.toJSON());
            client.commands.set(command.data.name, command);

            continue;
        }
    }

    client.application.commands.set(commands);
}