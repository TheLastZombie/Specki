if (args && args != "") {
	ytranslate.translate(args.join(" "), {
		to: "de"
	}, function(err, res) {
		if (err) {
			message.channel.send("```" + String(err) + "```");
			return;
		};
		message.channel.send("**" + message.author.tag + ": **" + res.text);
	});
} else {
	message.channel.fetchMessages({
		limit: 2
	}).then(temp => {
		ytranslate.translate(temp.last().content, {
			to: "de"
		}, function(err, res) {
			if (err) {
				message.channel.send("```" + String(err) + "```");
				return;
			};
			message.channel.send("**" + message.author.tag + ": **" + res.text);
		});
	});
}; 