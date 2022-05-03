const { SlashCommandBuilder } = require('@discordjs/builders');
const ethers = require("ethers")
const { getEthAddress, deleteEntry } = require('../aws-dynamodb');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('delete')
		.setDescription('Delete your connected Ethereum address'),

	async execute(interaction) {
        const discordHandle = interaction.user.tag

        try {
            let ethAddress = await getEthAddress(discordHandle)
            await deleteEntry(discordHandle)

            return interaction.reply({
                content: 'Successfully deleted your Ethereum address',
                ephemeral: true
            });

        } catch {
            return interaction.reply({
                content: 'You have not connected an Ethereum address yet, use /connect command',
                ephemeral: true
            });
        }
    }
}