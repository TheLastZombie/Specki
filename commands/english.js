if (args && args != "") {
	translate(args.join(" "), {
		to: "en"
	}).then(res => {
		message.channel.send("**" + message.author.tag + ": **" + res.text);
	}).catch(err => {
		message.channel.send("```" + err.toString() + "```");
	});
} else {
	message.channel.fetchMessages({
		limit: 2
	}).then(temp => {
		translate(temp.last().content, {
			to: "en"
		}).then(res => {
			message.channel.send("**" + message.author.tag + ": **" + res.text);
		}).catch(err => {
			message.channel.send("```" + err.toString() + "```");
		});
	});
};
