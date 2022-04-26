const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
require('dotenv').config()
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once('ready', async () => {
	console.log('Ready!');

    // Get Collection of commands
    const commandMap = await client.guilds.cache.get(process.env.GUILD_ID).commands.fetch()
    const commands = commandMap.keys()

    // Delete commands
    for (const commandId of commands) {
        try {
            await client.guilds.cache.get(process.env.GUILD_ID).commands.delete(commandId)
            console.log(`Deleted command ${commandId}`)
        } catch (e) {
            console.error(e)
        }
    }

    process.exit(0)
});

client.login(process.env.TOKEN);
