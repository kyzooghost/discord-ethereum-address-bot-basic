// Admin-only command to view entire database

// How to set-up admin-only command?
// How to set up json download?
// How to set up AWS config into .env

const { SlashCommandBuilder } = require('@discordjs/builders');
const ethers = require("ethers")
const { getList } = require('../aws-dynamodb');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('view-all')
		.setDescription('Admin Only - View all mapped Ethereum addresses'),

	async execute(interaction) {
        try {
            const list = await getList()
            return interaction.reply({
                content: `${list}`,
                ephemeral: true
            });         
        } catch {
            return interaction.reply({
                content: `Error in /view-all slash command`,
                ephemeral: true
            });
        }
    }
}

// Set up role-permissions in index.js
// https://discordjs.guide/interactions/slash-commands.html#user-permissions
// Set up download of .json 
// https://2ality.com/2015/08/es6-map-json.html