if (args && args != "") {
	request({
		url: "https://text.brow.sh/" + args.join(" "),
		method: "GET",
		rejectUnauthorized: false
	}, function (error, response, body) {
		request({
			url: "https://snippets.glot.io/snippets",
			method: "POST",
			json: {
				"files": [{"content": body}]
			}
		}, function (error, response, body) {
			message.channel.send("https://glot.io/snippets/" + body.id + "/raw");
		});
	});
} else {
	message.react("❎");
};