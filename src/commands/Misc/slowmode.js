const { SlashCommandBuilder, EmbedBuilder, ChannelType } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('slowmode')
        .setDescription('Set the slowmode for a channel.')
        .setDMPermission(false)
        .addIntegerOption(option =>
            option.setName('seconds')
                .setDescription('Slowmode in seconds.')
                .setRequired(true).setMaxValue(21600)
        ).addChannelOption(option =>
            option.setName('channel')
                .setDescription('Channel to apply the slowmode.')
                .setRequired(false)
                .addChannelTypes(
                    ChannelType.GuildText,
                    ChannelType.GuildAnnouncement
                )
        ),

    /**
     * @param {import('commandkit').SlashCommandProps} param0 
     */
    run: async ({ interaction }) => {
        const { options } = interaction;

        const slowmode = options.getInteger('seconds');
        const channel = options.getChannel('channel') || interaction.channel;

        const embed = new EmbedBuilder().setColor('Green')
            .setTitle('Success!')
            .setDescription('Slowmode set successfully.')
            .addFields(
                { name: 'Channel', value: `<#${channel.id}>`, inline: true },
                { name: 'Slowmode', value: slowmode.toString(), inline: true }
            );

        try {
            await channel.setRateLimitPerUser(slowmode);
            await interaction.reply({
                embeds: [embed],
                ephemeral: true
            });
        } catch (error) {
            console.error(error);
            return interaction.reply({
                content: 'An error occured...',
                ephemeral: true
            });
        }
    },

    /**
     * @type {import('commandkit').CommandOptions}
     */
    options: {
        botPermissions: ['ManageChannels'],
        userPermissions: ['ManageChannels', 'ManageMessages']
    }
}