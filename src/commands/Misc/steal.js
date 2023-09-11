const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, parseEmoji } = require("discord.js");
const { SlashCommandProps } = require("commandkit");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("steal")
        .setDescription("Steal an emoji.")
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
        .addStringOption(option =>
            option.setName("emoji")
                .setDescription("Type the emoji to steal.")
                .setRequired(true)
        ).addStringOption(option =>
            option.setName("name")
                .setDescription("Choose a new name for the emoji.")
                .setRequired(false)
        ),

    /**
     * @param {SlashCommandProps} param0 
     */

    run: async ({ interaction }) => {
        const { options, guild } = interaction;

        const emoji = options.getString("emoji");
        const parsedEmoji = parseEmoji(emoji);

        const url = `https://cdn.discordapp.com/emojis/${parsedEmoji.id}.${parsedEmoji.animated ? "gif" : "png"}`;
        let name = options.getString("name") || parsedEmoji.name;
        name = name.replace(/[^A-Za-z0-9_]/g, "_");

        if (!parsedEmoji || !parsedEmoji.id) {
            return interaction.reply({ content: "That's not a valid emoji.", ephemeral: true });
        }

        await interaction.deferReply();
        await guild.emojis.create({ attachment: url, name }).then((createdEmoji) => {
            const embed = new EmbedBuilder()
                .setTitle("Emoji created!")
                .addFields(
                    { name: "Emoji", value: createdEmoji.toString(), inline: true },
                    { name: "Name", value: name, inline: true },
                    { name: "ID", value: `\`${createdEmoji.id}\``, inline: true }
                );

            return interaction.editReply({ embeds: [embed] });
        });
    },

    options: {
        botPermissions: ["ManageGuild"]
    }
}