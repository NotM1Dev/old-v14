const { SlashCommandBuilder } = require("discord.js");
const player = require("../../utils/player");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("skip")
        .setDescription("Skip the current song.")
        .setDMPermission(false),

    /**
     * @param {import("commandkit").SlashCommandProps} param0 
     */
    run: async ({ interaction }) => {
        const { member, guild } = interaction;
        const voiceChannel = member.voice.channel;

        if (!voiceChannel) {
            return interaction.reply({ content: "You must be in a voice channel.", ephemeral: true });
        }

        if (!member.voice.channel == guild.members.me.voice.channel) {
            return interaction.reply({
                content: `Please join <#${guild.members.me.voice.channelId}>`,
                ephemeral: true
            });
        }

        try {
            let type = "Skipped";

            await player.skip(guild.id)
                .then(() => type = "Skipped")
                .catch(() => type = "Stopped.");

            return interaction.reply({ content: type, ephemeral: true });
        } catch (error) {
            await interaction.reply({ content: "An error occured.", ephemeral: true });
            console.error(error);
        }
    },

    options: {
        botPermissions: ["Connect", "Speak", "SendMessages"]
    }
}