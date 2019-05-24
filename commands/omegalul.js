if (args && args != "") {
	message.channel.send("**" + message.author.tag + ": **" + args.join(" ").replace(/o/gi, "<:omegalul:581551408252321834>"));
} else {
	message.channel.fetchMessages({
		limit: 2
	}).then(temp => {
		message.channel.send("**" + message.author.tag + ": **" + temp.last().content.replace(/o/gi, "<:omegalul:581551408252321834>")));
	});
};
