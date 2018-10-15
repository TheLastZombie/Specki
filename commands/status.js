if (args && args != "") {
	console.log("Ändere Bot-Status zu \"" + args.join(" ") + "\".");
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
			console.log("Konnte Status nicht auf glot.io hochladen.");
		} else {
			console.log("Status erfolgreich auf glot.io hochgeladen.");
		};
	});
} else {
	message.channel.fetchMessages({
		limit: 2
	}).then(temp => {
		console.log("Ändere Bot-Status zu \"" + temp.last().content + "\".");
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
				console.log("Konnte Status nicht auf glot.io hochladen.");
			} else {
				console.log("Status erfolgreich auf glot.io hochgeladen.");
			};
		});
	});
};
message.react("✅");