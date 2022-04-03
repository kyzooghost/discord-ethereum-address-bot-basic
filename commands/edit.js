const { SlashCommandBuilder } = require('@discordjs/builders');
const ethers = require("ethers")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('edit')
		.setDescription('Edit your Ethereum address')
        .addStringOption(option =>
            option.setName('ethAddress')
                    .setDescription('Your Ethereum address')
                    .setRequired(true)
            ),

	async execute(interaction) {
        // If no current entry
        if (!hashmap.has(interaction.user.tag)) {
            return interaction.reply({
                content: 'You have not verified a valid Ethereum address yet, use /verify command',
                ephemeral: true
            });
        }

        const ethAddress = interaction.options.getString('ethAddress')
        
        if ( ethers.utils.isAddress(ethAddress) ) {
            // hashmap.insert(discordName, ethereumAddress)
            return interaction.reply({
                content: 'Successfully verified your Ethereum address',
                ephemeral: true
            });
        } else {
            return interaction.reply({
                content: 'Not a valid Ethereum address',
                ephemeral: true
            })
        }
    }
}

// /verify slash command - only work in #verify channel
// Person types Ethereum address, press enter
// If valid, responds "success!"
// Inserts into hashmap