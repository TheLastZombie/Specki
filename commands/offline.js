if (ownerIds.includes(message.author.id)) {
	if (offline) {
		client.user.setPresence({
			status: "online"
		}).then(function() {
			message.react("✅");
			offline = false;
		}).catch(function() {
			message.react("❎");
		});
	} else {
		client.user.setPresence({
			status: "invisible"
		}).then(function() {
			message.react("✅");
			offline = true;
		}).catch(function() {
			message.react("❎");
		});
	};
} else {
	message.react("❎");
};