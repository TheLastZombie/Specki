if (/\[.+\] \[.+\]/.test(args.join(" "))) {
	figlet.text(args.join(" ").match(/\] \[.+\]/).toString().slice(3, -1), {
		font: args.join(" ").match(/\[.+\] \[/).toString().slice(1, -3)
	}, function(err, temp) {
		if (err) {
			figlet.fonts(function(err, temp) {
				message.channel.send("Error: Font not found!\n\nUsage: `" + process.env.PREFIX + command + " [Font] [Message]`\nExample: `" + process.env.PREFIX + command + " [Ghost] [Hello, World!]`\n\nA complete list of fonts can be found at http://www.figlet.org/examples.html.");
			});
			return;
		};
		message.channel.send("```" + temp + "```");
	});
};
