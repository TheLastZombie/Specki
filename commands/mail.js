if (args && args != "") {
	request("https://www.validator.pizza/email/" + args.join(" "), function (error, response, body) {
		if (JSON.parse(body).status == 200) {
			message.channel.send("**Input:** " + JSON.parse(body).email + "\n" + "**Domain:** " + JSON.parse(body).domain + "\n" + "**MX Record:** " + (JSON.parse(body).mx ? "✅" : "❎") + "\n" + "**Disposable:** " + (JSON.parse(body).disposable ? "✅" : "❎") + "\n" + "**Alias:** " + (JSON.parse(body).alias ? "✅" : "❎"));
		} else {
			message.channel.send("**Error:** " + JSON.parse(body).error);
		};
	});
};
