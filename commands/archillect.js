request("https://archillect-api.now.sh/random", function (error, response, body) {
	message.channel.send("Archillect \\|\\|\\| " + JSON.parse(body).id + " \\|\\|\\| <" + JSON.parse(body).original + ">", {
		files: [JSON.parse(body).imageSource]
	});
});
