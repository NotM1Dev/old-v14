const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

const player = require("../../utils/player");
const abbreviate = require("../../utils/abbreviate");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("nowplaying")
        .setDescription("See the current playing song.")
        .setDMPermission(false),

    /**
     * @param {import("commandkit").SlashCommandProps} param0 
     */
    run: async ({ interaction, client }) => {
        const { guild, member } = interaction;
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
            const queue = player.getQueue(guild.id);

            if (!queue || !queue.songs) {
                return interaction.reply({ content: "There is nothing playing.", ephemeral: true });
            }

            const song = queue.songs[0];
            const uploader = song.uploader.url
                ? `[${song.uploader.name}](${song.uploader.url})`
                : song.uploader.name;

            const embed = new EmbedBuilder().setColor("Red")
                .setAuthor({ name: song.user.username, iconURL: song.user.displayAvatarURL() })
                .setTitle(song.name).setThumbnail(song.thumbnail || null)
                .setTimestamp().addFields(
                    { name: "Duration", value: `\`${song.formattedDuration}\``, inline: true },
                    { name: "Views", value: abbreviate(song.views).toString(), inline: true },
                    { name: "Uploader", value: uploader.toString(), inline: true }
                );

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            throw error;
        }
    },

    options: {
        botPermissions: ["Connect", "Speak"]
    }
}