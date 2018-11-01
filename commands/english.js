if (args && args != "") {
	translate(args.join(" "), {
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
		ytranslate.translate(temp.last().content, {
			to: "en"
		}).then(temp => {
			message.channel.send("**" + message.author.tag + ": **" + temp.text);
		}).catch(err => {
			message.channel.send("```" + String(err) + "```");
		});
	});
};
