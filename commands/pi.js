if (args.length == 2) {
	var start = Number(args[0].replace(",", "."));
	var digits = Number(args[1].replace(",", "."));
	request("https://api.pi.delivery/v1/pi?start=" + start + "&numberOfDigits=" + digits, function (error, response, body) {
		message.channel.send(JSON.parse(body).Error || JSON.parse(body).content);
	});
} else {
	message.channel.send("Too many or not enough arguments supplied!\n\nUsage: `" + process.env.PREFIX + command + " [Starting Position] [Number of Digits]`\nExample: `" + process.env.PREFIX + command + " 0 100`");
};
