const { SlashCommandBuilder } = require('@discordjs/builders');
const ethers = require("ethers")
const { getEthAddress } = require('../aws-dynamodb');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('view')
		.setDescription('View your Ethereum address'),

	async execute(interaction) {
        const discordHandle = interaction.user.tag

        try {
            let ethAddress = await getEthAddress(discordHandle)

            return interaction.reply({
                content: `Your verified Ethereum address is ${ethAddress}`,
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