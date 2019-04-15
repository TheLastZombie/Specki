request("https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY", function (error, response, body) {
	message.channel.send({
		embed: {
			title: JSON.parse(body).title,
			description: (JSON.parse(body).explanation.length > 2048 ? JSON.parse(body).explanation.substring(0, 2047) + "…" : JSON.parse(body).explanation),
			image: {
				url: JSON.parse(body).url
			}
		}
	});
});
