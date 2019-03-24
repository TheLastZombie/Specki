if (ownerIds.includes(message.author.id)) {
	try {
		var evout = eval(args.join(" "));
		if (evout) {
			message.channel.send("Output: \n```" + JSON.stringify(evout) + "```");
		};
		message.react("✅");
	} catch(err) {
		message.channel.send("Error: \n```" + err.toString() + "```");
	};
} else {
	message.react("❎");
};
