if (args && args != "") {
	message.channel.send("**" + message.author.tag + ": **" + args.join(" ").replace(/o/gi, "<:omegalul:567236059772092426>"));
} else {
	message.channel.fetchMessages({
		limit: 2
	}).then(temp => {
		message.channel.send("**" + message.author.tag + ": **" + temp.last().content.replace(/o/gi, "<:omegalul:567236059772092426>"));
	});
};
