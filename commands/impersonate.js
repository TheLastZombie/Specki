if (message.mentions.users.size == 0) {
	message.channel.send("❌ No user mentioned!");
} else {
	if (message.mentions.users.size > 1) {
		message.channel.send("⚠️ Multiple users mentioned, using first.");
	};
	client.user.setAvatar(message.mentions.users.first().avatarURL);
	client.guilds.map(guild => {
		if (guild.me.hasPermission("CHANGE_NICKNAME")) {
			guild.me.setNickname(guild.member(message.mentions.users.first()).displayName || message.mentions.users.first().username);
		};
	});
	client.user.setPresence(message.mentions.users.first().presence);
	message.react("✅");
};
