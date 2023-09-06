const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, CommandInteraction } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("kick")
        .setDescription("Kick a member from the server.")
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
        .addUserOption(option =>
            option.setName("member")
                .setDescription("Select a member to kick.")
                .setRequired(true)
        ).addStringOption(option =>
            option.setName("reason")
                .setDescription("Specify a reason for the kick.")
                .setRequired(false)
        ),

    /**
     * 
     * @param {CommandInteraction} interaction 
     */

    run: async ({ interaction }) => {
        const { options } = interaction;

        const target = options.getMember("member");
        const reason = options.getString("reason") || "No reason provided";

        const embed = new EmbedBuilder()
            .setDescription(`${target.user.tag} was kicked with the reason "${reason}"`)
            .setColor("Blurple");

        const errorEmbed = new EmbedBuilder()
            .setColor("Red")
            .setDescription(`I couldn't kick ${target.user.tag}, this is likely a permissions issue.`);

        target.kick(reason)
            .then(() => {
                return interaction.reply({
                    embeds: [embed]
                });
            }).catch((error) => {
                return interaction.reply({
                    embeds: [errorEmbed]
                });
            });
    }
}
