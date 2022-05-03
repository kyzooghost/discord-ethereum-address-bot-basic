const { SlashCommandBuilder } = require('@discordjs/builders');
const ethers = require("ethers")
const { getEthAddress } = require('../aws-dynamodb');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('view')
		.setDescription('View your Ethereum address'),

	async execute(interaction) {
        const discordHandle = interaction.user.tag

        let ethAddress = await getEthAddress(discordHandle)

        if (ethAddress) {
            return interaction.reply({
                content: `Your connect Ethereum address is ${ethAddress}`,
                ephemeral: true
            });
        } else {
            return interaction.reply({
                content: 'You have not connected an Ethereum address yet, use /connect command',
                ephemeral: true
            });
        }

        // try {
        //     let ethAddress = await getEthAddress(discordHandle)

        //     return interaction.reply({
        //         content: `Your connect Ethereum address is ${ethAddress}`,
        //         ephemeral: true
        //     });

        // } catch {
        //     return interaction.reply({
        //         content: 'You have not connected an Ethereum address yet, use /connect command',
        //         ephemeral: true
        //     });
        // }
    }
}