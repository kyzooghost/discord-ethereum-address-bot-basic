const { SlashCommandBuilder } = require('@discordjs/builders');
const ethers = require("ethers")
const { getEthAddress, deleteEntry, createEntry } = require('../aws-dynamodb');

// Person types Ethereum address, press enter
// Sanity check against incorrect Ethereum address using ethers.utils.isAddress
// If person hasn't previously verified or has deleted their verified address, will create a new database entry
// If person has an existing entry in the database, will delete the old entry and create a new one

module.exports = {
	data: new SlashCommandBuilder()
		.setName('connect')
		.setDescription('Connect your Ethereum address')
        .addStringOption(option => 
            option.setName('ethereum-address')
                .setDescription('Your Ethereum address')
                .setRequired(true)),

	async execute(interaction) {
        // If valid Eth address
        const ethAddress = interaction.options.getString('ethereum-address')
        const discordHandle = interaction.user.tag

        if ( !ethers.utils.isAddress(ethAddress) ) {
            return interaction.reply({
                content: 'You did not enter a valid Ethereum address',
                ephemeral: true
            });
        } else {
            // If valid Ethereum address
            // Try to obtain entry in database

            let ethAddress = await getEthAddress(discordHandle)

            if (ethAddress) {
            // -> No error => Entry found => Delete old entry, create new entry
                // Is interaction.user.tag the Discord handle string we want?
                await deleteEntry(discordHandle)
                await createEntry(discordHandle, ethAddress)
                return interaction.reply({
                    content: 'Successfully changed your connected Ethereum address',
                    ephemeral: true
                });
            } else {
            // -> Error => Entry not there => Create new entry with createEntry
            // Code smell here - error !== "entry not there", but we are treating it as such
                await createEntry(discordHandle, ethAddress)
                return interaction.reply({
                    content: 'Successfully connected your Ethereum address',
                    ephemeral: true
                });
            }

            // try {
            // // -> No error => Entry found => Delete old entry, create new entry
            //     // Is interaction.user.tag the Discord handle string we want?
            //     await getEthAddress(discordHandle)
            //     await deleteEntry(discordHandle)
            //     await createEntry(discordHandle, ethAddress)
            //     return interaction.reply({
            //         content: 'Successfully changed your connected Ethereum address',
            //         ephemeral: true
            //     });
            // } catch {
            // // -> Error => Entry not there => Create new entry with createEntry
            // // Code smell here - error !== "entry not there", but we are treating it as such
            //     await createEntry(discordHandle, ethAddress)
            //     return interaction.reply({
            //         content: 'Successfully connected your Ethereum address',
            //         ephemeral: true
            //     });
            // }
        }
    }
}