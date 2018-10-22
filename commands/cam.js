request("https://git.io/c4", function (error, response, body) {
	request(body.split("\n")[Math.floor(Math.random() * body.split("\n").length)], function (error, response, body) {
		if (error || response.statusCode != 200) {
			message.react("❎");
		} else {
			message.channel.send(response.request.uri.href);
		};
	});
});
