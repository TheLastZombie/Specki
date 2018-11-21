if (args && args != "") {
	request("https://xfmro77i3lixucja.onion.to/search/?q=" + args.join(" ") + "&fmt=json", function (error, response, body) {
		if (JSON.parse(body).found > 0) {
			message.channel.send({
				files: ["https://xfmro77i3lixucja.onion.to/" + JSON.parse(body).books[0].download]
			});
		} else {
			message.react("❎");
		};
	});
} else {
	message.react("❎");
};
