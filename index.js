const Discord = require("discord.js")
require("dotenv").config()
const TOKEN = "OTczNTk4MTY3NDY5NzkzMzYw.G3qyy_.aBminjyIiEyqwSnYI9rUb_4a3DPgzb8uHVNWEM"
const client = new Discord.Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES"
    ]
})

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`)
})

client.on("messageCreate", (message) => {
    if(message.content == "hi"){
        message.reply("hello!")
    }
})

client.login(process.env.TOKEN)