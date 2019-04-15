var bot = require("discord.io");
bot = new bot.Client({
	token: process.env.TOKEN,
	autorun: true
});
bot.on("ready", function(event) {
	console.log("Erfolgreich eingeloggt als %s (%s).\n", bot.username, bot.id);
	console.log(JSON.stringify(bot, null, 4));
	bot.disconnect();
});