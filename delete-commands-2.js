// Using direct HTTP request to official Discord API, in case discord.js fails to delete commands

// https://discord.com/developers/docs/interactions/application-commands#get-global-application-commands
// https://discord.com/developers/docs/interactions/application-commands#updating-and-deleting-a-command

const axios = require("axios")
require('dotenv').config()

async function main () {
    console.time("script_run_time")
    
    const commandIds = await getArrayOfCommandsIds()

    for (const commandId of commandIds) {
        await deleteCommand(commandId)
    }
}

async function getArrayOfCommandsIds() {
    const url = `https://discord.com/api/v8/applications/${process.env.CLIENT_ID}/commands`
    
    const config = {
        headers: {
            Authorization: `Bot ${process.env.TOKEN}`,
        }
    };

    const response = await axios.get(url, config)
    const commands = response.data
    return commands.map(command => command.id)   
}

async function deleteCommand(commandId) {
    const url = `https://discord.com/api/v8/applications/${process.env.CLIENT_ID}/commands/${commandId}`

    const config = {
        headers: {
            Authorization: `Bot ${process.env.TOKEN}`,
        }
    };

    await axios.delete(url, config)
    console.log(`Deleted command ${commandId}`)
}

main()
    .then((resp) => {
        console.log(resp)
        console.log("SUCCESS!")
        console.timeEnd("script_run_time")
    })
    .catch((e) => {
        console.error(e)
        console.log("FAILED!")
        console.timeEnd("script_run_time")
    })