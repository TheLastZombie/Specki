if (args && args != "") {
	console.log("Changing activity to \"" + args.join(" ") + "\".");
	client.user.setActivity(args.join(" "));
	request({
		url: "https://snippets.glot.io/snippets/" + process.env.GLOT_ID,
		method: "PUT",
		headers: {
			"Authorization": "Token " + process.env.GLOT_TK
		},
		json: {
			"files": [{"name": "commands.json", "content": JSON.stringify(cmdcnt)}, {"name": "status.txt", "content": args.join(" ")}]
		}
	}, function (error, response, body) {
		if (error) {
			console.log("Couldn't upload data to glot.io.");
		} else {
			console.log("Successfully uploaded data to glot.io.");
		};
	});
} else {
	message.channel.fetchMessages({
		limit: 2
	}).then(temp => {
		console.log("Changing activity to \"" + temp.last().content + "\".");
		client.user.setActivity(temp.last().content);
		request({
			url: "https://snippets.glot.io/snippets/" + process.env.GLOT_ID,
			method: "PUT",
			headers: {
				"Authorization": "Token " + process.env.GLOT_TK
			},
			json: {
				"files": [{"name": "status.txt", "content": temp.last().content}]
			}
		}, function (error, response, body) {
			if (error) {
				console.log("Couldn't upload data to glot.io.");
			} else {
				console.log("Successfully uploaded data to glot.io.");
			};
		});
	});
};
message.react("✅");