if (args && args != "") {
	if (Math.round(Math.random())) {
		message.channel.send(args[0] + " 👍");
	} else {
		message.channel.send(args[0] + " 👎");
	};
} else {
	if (Math.round(Math.random())) {
		message.react("👍");
	} else {
		message.react("👎");
	};
};
