module.exports = {
	name: 'interactionCreate',
	async execute(client, interaction) {
		
		if (interaction.hasOwnProperty('channel')) {
			console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);
		} else {
			console.log(`${interaction.user.tag} triggered an interaction.`);
		}

		if (!interaction.isCommand()) return;

		const command = client.commands.get(interaction.commandName);

		if (!command) return;

		const acceptedCommands = ['view', 'delete', 'connect']

		if (acceptedCommands.includes(command.data.name)) {
			console.log(command.data.name)
			try {
				await command.execute(interaction);
			} catch (error) {
				console.error(error);
				await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
			}
		} else {
			return
		}
	},
};