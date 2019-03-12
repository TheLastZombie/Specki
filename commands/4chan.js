if (message.channel.nsfw == false) {
	message.react("🔞");
} else {
	var temp;
	request("https://a.4cdn.org/boards.json", function (error, response, body) {
		if (JSON.parse(body).boards.some(temp => temp.board == args.join(" "))) {
			board = args.join(" ");
		} else {
			board = JSON.parse(body).boards[Math.floor(Math.random() * JSON.parse(body).boards.length)].board;
		};
		request("https://a.4cdn.org/" + board + "/catalog.json", function (error, response, body) {
			temp = JSON.parse(body)[Math.floor(Math.random() * JSON.parse(body).length)].threads;
			temp = temp[Math.floor(Math.random() * temp.length)];
			message.channel.send({
				embed: {
					title: (temp.sub ? temp.sub : "/" + board + "/ – Thread #" + temp.no),
					description: breakdance(temp.com),
					url: "https://boards.4chan.org/" + board + "/thread/" + temp.no,
					timestamp: new Date(temp.tim).toISOString(),
					author: {
						"name": temp.name
					},
					thumbnail: {
						url: "https://i.4cdn.org/" + board + "/" + temp.tim + temp.ext
					},
					footer: {
						text: temp.replies + " replies, " + temp.images + " images"
					}
				}
			});
		});
	});
};
