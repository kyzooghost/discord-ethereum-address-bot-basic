const { SlashCommandBuilder } = require('@discordjs/builders');
const ethers = require("ethers")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('delete')
		.setDescription('Delete your Ethereum address'),

	async execute(interaction) {
        // If no current entry
        if (!hashmap.has(interaction.user.tag)) {
            return interaction.reply({
                content: 'You have not verified a valid Ethereum address yet, use /verify command',
                ephemeral: true
            });
        }

        hashmap.delete(interaction.user.tag)

        return interaction.reply({
            content: 'Successfully deleted your Ethereum address',
            ephemeral: true
        });
    };
}