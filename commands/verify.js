const { SlashCommandBuilder } = require('@discordjs/builders');
const ethers = require("ethers")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('verify')
		.setDescription('Verify your Ethereum address')
        .addStringOption(option =>
            option.setName('ethAddress')
                    .setDescription('Your Ethereum address')
                    .setRequired(true)
        ),

	async execute(interaction) {
        // If valid Eth address
        const ethAddress = interaction.options.getString('ethAddress')
    
        if ( ethers.utils.isAddress(ethAddress) ) {
            hashmap.set(interaction.user.tag, ethAddress)
            return interaction.reply({
                content: 'Successfully verified your Ethereum address',
                ephemeral: true
            });
        } else {
            return interaction.reply({
                content: 'Not a valid Ethereum address',
                ephemeral: true
            });
        }
    
    }
}

// /verify slash command - only work in #verify channel
// Person types Ethereum address, press enter
// If valid, responds "success!"
// Inserts into hashmap