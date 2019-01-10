if (message.mentions.users.size == 0) {
	message.channel.send("❌ No user mentioned!");
} else {
	if (message.mentions.users.size > 1) {
		message.channel.send("⚠️ Multiple users mentioned, using first.");
	};
	client.user.setAvatar(message.mentions.users.first().avatarURL);
	client.guilds.map(guild => {
		if (guild.me.hasPermission("CHANGE_NICKNAME")) {
			if (guild.member(message.mentions.users.first())) {
				guild.me.setNickname(guild.member(message.mentions.users.first()).displayName);
			} else {
				guild.me.setNickname(message.mentions.users.first().username);
			};
		};
	});
	if (message.author.presence.game) {
		client.user.setPresence(message.mentions.users.first().presence);
	} else {
		client.user.setActivity(null);
	};
	message.react("✅");
};
