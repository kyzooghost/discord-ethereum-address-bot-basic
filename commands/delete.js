const { SlashCommandBuilder } = require('@discordjs/builders');
const ethers = require("ethers")
const { getEthAddress, deleteEntry } = require('../aws-dynamodb');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('delete')
		.setDescription('Delete your verified Ethereum address'),

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
                content: 'You have not verified an Ethereum address yet, use /verify command',
                ephemeral: true
            });
        }
    }
}