const { SlashCommandBuilder } = require('discord.js');
const player = require('../../utils/player');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Play music in a voice channel.')
        .setDMPermission(false)
        .addStringOption(option =>
            option.setName('query')
                .setDescription('What do you want to listen to?')
                .setRequired(true)
        ),

    /**
     * @param {import('commandkit').SlashCommandProps} param0 
     */
    run: async ({ interaction }) => {
        const { options, member, guild, channel } = interaction;

        const query = options.getString('query');
        const voiceChannel = member.voice.channel;

        if (!voiceChannel) {
            return interaction.reply({ content: 'You must be in a voice channel.', ephemeral: true });
        }

        if (!member.voice.channel == guild.members.me.voice.channel) {
            return interaction.reply({
                content: `Please join <#${guild.members.me.voice.channelId}>`,
                ephemeral: true
            });
        }

        try {
            await interaction.reply({ content: 'Added to queue.', ephemeral: true });
            await player.play(voiceChannel, query, { textChannel: channel, member });
        } catch (error) {
            await interaction.reply({ content: 'An error occured.', ephemeral: true });
            console.error(error);
        }
    },

    options: {
        botPermissions: ['Connect', 'Speak', 'SendMessages']
    }
}