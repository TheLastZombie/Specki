if (args && args != "") {
	request({
		url: "https://leo.immobilien/api/create",
		method: "POST",
		json: {
			url: args.join(" ")
		}
	}, function (error, response, body) {
		if (body.status == "success") {
			message.channel.send("https://leo.immobilien/" + body.urlKey);
		} else {
			message.channel.send(body.status);
			message.react("❎");
		};
	});
} else {
	message.react("❎");
};