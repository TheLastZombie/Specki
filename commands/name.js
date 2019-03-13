if (ownerIds.includes(message.author.id)) {
	if (args && args != "") {
		console.log("Changing name to \"" + args.join(" ") + "\".");
		client.user.setUsername(args.join(" "));
	} else {
		message.channel.fetchMessages({
			limit: 2
		}).then(temp => {
			console.log("Changing name to \"" + temp.last().content + "\".");
			client.user.setUsername(temp.last().content);
		});
	};
	message.react("✅");
} else {
	message.react("❎");
};
