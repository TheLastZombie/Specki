if (message.attachments.first()) {
	console.log("Changing avatar to " + message.attachments.first().url + ".");
	client.user.setAvatar(message.attachments.first().url).then(function() {
		message.react("✅");
	}).catch(function() {
		message.react("❎");
	});
} else if (args && args != "") {
	console.log("Changing avatar to " + args.join(" ") + ".");
	client.user.setAvatar(args.join(" ")).then(function() {
		message.react("✅");
	}).catch(function() {
		message.react("❎");	
	});
} else {
	message.react("❎");
};