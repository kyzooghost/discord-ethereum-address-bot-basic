This Discord bot will enable Discord users to anonymously declare their public Ethereum address. The database of Discord users and corresponding Ethereum addresses is stored in AWS DynamoDB.

Discord users will use slash commands to interact with the bot
- /connect => Enter Ethereum address, or change their Ethereum address if they previously verified
- /delete => Delete their Discord handle and Ethereum address from the database
- /view => See their listed Ethereum address

# How to use

1. `git clone` and `npm install` this repo

2. Setup environment variables (.env file if running on a local machine)

3. Register the slash commands in the Discord server with `node deploy-commands` (alternative with `./deploy-commands.sh` if discord.js is having issues). Discord requires this step before the bot's slash commands work

4. Run the bot with `./run_discord_bot.sh`. This is intended to be running continuously.

# Editting Bot Behaviour

1. Delete slash commands with either `node delete-commands` (uses Discord.js) or `node delete-commands-2` (Uses direct API request to Discord API, fallback method)

# Issues

- Program reading an undefined variable and crashing the program, need to consider that every object obtained from remote server can be undefined

- Discord.js API calls unreliable? Recently had to bypass Discord.js library and make direct HTTP requests to Discord API.