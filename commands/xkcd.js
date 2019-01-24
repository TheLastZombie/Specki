if (args && args != "") {
	request("http://xkcd.com/" + args.join(" ") + "/info.0.json", function (error, response, body) {
		if (error || response.statusCode == 404) {
			message.channel.send("**" + JSON.parse(body).title + "**\n" + JSON.parse(body).alt, {
				files: [JSON.parse(body).img]
			});
		} else {
			request("http://xkcd.com/info.0.json", function (error, response, body) {
				message.channel.send("**" + JSON.parse(body).title + "**\n" + JSON.parse(body).alt, {
					files: [JSON.parse(body).img]
				});
			});
		};
	});
} else {
	request("http://xkcd.com/info.0.json", function (error, response, body) {
		message.channel.send("**" + JSON.parse(body).title + "**\n" + JSON.parse(body).alt, {
			files: [JSON.parse(body).img]
		});
	});
};
