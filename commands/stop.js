if (ownerIds.includes(message.author.id)) {
	if (message.guild.me.voiceChannel) {
		message.guild.me.voiceChannel.leave();
		message.channel.send("Found and left voice channel.");
	};
	if (isplay.has(message.guild.id)) {
		isplay.delete(message.guild.id);
		message.channel.send("Found and removed guild ID from isplay.");
	};
} else {
	message.channel.send("This command can only be used by the bot owner.");
};
