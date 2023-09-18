const { SlashCommandBuilder } = require("discord.js");
const player = require("../../utils/player");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("pause")
        .setDescription("Pause the current queue.")
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
            await interaction.reply({ content: "Paused.", ephemeral: true });
            player.pause(guild.id);
        } catch (error) {
            await interaction.reply({ content: "An error occured.", ephemeral: true });
            console.error(error);
        }
    },

    options: {
        botPermissions: ["Connect", "Speak", "SendMessages"]
    }
}