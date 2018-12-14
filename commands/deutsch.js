if (args && args != "") {
	translate(args.join(" "), "DE").then(function(res) {
		message.channel.send("**" + message.author.tag + ": **" + res.translation);
	});
} else {
	message.channel.fetchMessages({
		limit: 2
	}).then(temp => {
		translate(temp.last().content, "DE").then(function(res) {
			message.channel.send("**" + message.author.tag + ": **" + res.translation);
		});
	});
};