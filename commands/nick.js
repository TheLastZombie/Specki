if (args && args != "") {
	console.log("Changing nickname to \"" + args.join(" ") + "\".");
	client.guilds.map(guild => {
		if (guild.me.hasPermission("CHANGE_NICKNAME")) {
			guild.me.setNickname(args.join(" "));
		};
	});
} else {
	message.channel.fetchMessages({
		limit: 2
	}).then(temp => {
		console.log("Changing nickname to \"" + temp.last().content + "\".");
		client.guilds.map(guild => {
			if (guild.me.hasPermission("CHANGE_NICKNAME")) {
				guild.me.setNickname(temp.last().content);
			};
		});
	});
};
message.react("✅");