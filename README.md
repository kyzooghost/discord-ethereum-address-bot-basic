This Discord bot will enable Discord users to anonymously declare their public Ethereum address. The database of Discord users and corresponding Ethereum addresses is stored in AWS DynamoDB.

Discord users will use slash commands to interact with the bot
- /verify => Enter Ethereum address, or change their Ethereum address if they previously verified
- /delete => Delete their Discord handle and Ethereum address from the database
- /view => See their listed Ethereum address

# How to use

1. `git clone` and `npm install` this repo

2. Setup environment variables (.env file if running on a local machine)

3. Register the slash commands in the Discord server with `node deploy-commands`. Discord requires this step before the bot's slash commands work

4. Run the bot with `node index`. This is intended to be running continuously.