module.exports = {
    name: "interactionCreate",
    run: (interaction) => {
        const { client, commandName } = interaction;

        if (!client.commands.has(commandName)) {
            return interaction.reply({
                content: "This command is outdated! Please retry in a few minutes.",
                ephemeral: true
            });
        }

        const command = client.commands.get(commandName);

        try {
            command.run(interaction);
        } catch (error) {
            interaction.reply({
                content: "An error occured running this command!",
                ephemeral: true
            });
            throw error;
        }
    }
}