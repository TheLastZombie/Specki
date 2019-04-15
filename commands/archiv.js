if (args && args != "") {
	var archive1 = false;
	var archive2 = false;
	var archive3 = false;
	request("http://archive.org/wayback/available?url=" + args.join(" "), function (error, response, body) {
		if (JSON.parse(body).archived_snapshots.closest) {
			archive1 = JSON.parse(body).archived_snapshots.closest.url;
		};
		request("http://archive.today/newest/" + args.join(" "), function (error, response, body) {
			if (response.statusCode == 200) {
				archive2 = response.request.href;
			};
			request("http://webcache.googleusercontent.com/search?q=cache:" + args.join(" "), function (error, response, body) {
				if (response.statusCode == 200) {
					archive3 = response.request.href;
				};
				message.channel.send({
					embed: {
						author: {
							name: "Archivsuche: " + args.join(" "),
							icon_url: client.user.avatarURL
						},
						url: "https://rsch.neocities.org",
						fields: [
							{
								name: "Wayback Machine",
								value: ((archive1) ? "✅ " + archive1 : "❎ Unavailable")
							},
							{
								name: "archive.today",
								value: ((archive2) ? "✅ " + archive2 : "❎ Unavailable")
							},
							{
								name: "Google Web Cache",
								value: ((archive3) ? "✅ " + archive3 : "❎ Unavailable")
							}
						]
					}
				});
			});
		});
	});
} else {
	message.react("❎");
};
