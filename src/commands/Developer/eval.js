const { ApplicationCommandOptionType } = require('discord.js');
const { inspect } = require('util');

module.exports = {
    /**
     * @type {import('commandkit').CommandData}
     */
    data: {
        name: 'eval',
        description: 'Evaluate some code.',
        options: [
            {
                name: 'input',
                description: 'The code to evaluate.',
                type: ApplicationCommandOptionType.String,
                required: true
            },

            {
                name: 'hide',
                description: 'Whether to hide the output',
                type: ApplicationCommandOptionType.Boolean,
                required: false
            }
        ]
    },

    /**
     * @param {import('commandkit').SlashCommandProps} param0 
     */
    run: async ({ interaction }) => {
        const { options } = interaction;

        const input = options.getString('input');
        const hide = options.getBoolean('hide');

        const evaluated = await eval(input);
        const out = inspect(evaluated);

        await interaction.reply({
            content: `\`\`\`${out}\`\`\``,
            ephemeral: hide
        }).catch((e) => {
            interaction.reply({
                content: `\`\`\`${e.message}\`\`\``,
                ephemeral: hide
            });
        });
    },

    /**
     * @type {import('commandkit').CommandOptions}
     */
    options: {
        devOnly: true
    }
}