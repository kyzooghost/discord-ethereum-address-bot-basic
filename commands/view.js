const { SlashCommandBuilder } = require('@discordjs/builders');
const ethers = require("ethers")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('view')
		.setDescription('View your Ethereum address'),

	async execute(interaction) {

        // If no current entry
        if (!hashmap.has(interaction.user.tag)) {
            return interaction.reply({
                content: 'You have not verified a valid Ethereum address yet, use /verify command',
                ephemeral: true
            });
        }

        const ethAddress = hashmap.get(interaction.user.tag)
        
        return interaction.reply({
            content: `Your Ethereum address is ${ethAddress}`,
            ephemeral: true
        });
    }
}