if (args && args != "") {
	if (Math.round(Math.random())) {
		message.channel.send(message.guild.emojis.find("name", args[0]) + " :thumbsup:");
	} else {
		message.channel.send(message.guild.emojis.find("name", args[0]) + " :thumbsdown:");
	};
} else {
	if (Math.round(Math.random())) {
		message.channel.send(":thumbsup:");
	} else {
		message.channel.send(":thumbsdown:");
	};
};
