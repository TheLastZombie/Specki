if (args && args != "") {
	request("https://unshorten.me/s/" + args.join(" "), function (error, response, body) {
		message.channel.send(body);
	});
} else {
	message.react("❎");
};
