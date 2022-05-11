const fs = require('node:fs');
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./config.json');
const { Player } = require("discord-player");


const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES] });

//loop through command files to know what are acceptable commands
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

//setup player to manage songs played
client.player = new Player(client, {
    ytdlOptions: {
        quality: "highestaudio",
        highWaterMark: 1 << 25
    }
})

client.once('ready', () => {
	console.log('Ready!');
});

//handler for when an interaction is made, checking if command was made or if button was clicked
client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand() && !interaction.isButton()) return;

    if(interaction.isButton()){
        console.log(interaction.customId);
    }

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

    //console.log("debugging..." + command);

	try {
        await interaction.deferReply();
		await command.run({client, interaction});
        
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.login(token);