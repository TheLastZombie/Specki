if (args && args != "") {
	gtranslate(args.join(" "), {
		to: "en"
	}).then(temp => {
		message.channel.send("**" + message.author.tag + ": **" + temp.text);
	}).catch(err => {
		message.channel.send("```" + String(err) + "```");
	});
} else {
	message.channel.fetchMessages({
		limit: 2
	}).then(temp => {
		gtranslate(temp.last().content, {
			to: "en"
		}).then(temp => {
			message.channel.send("**" + message.author.tag + ": **" + temp.text);
		}).catch(err => {
			message.channel.send("```" + String(err) + "```");
		});
	});
};
