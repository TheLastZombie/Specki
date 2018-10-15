request("https://rms.sexy/?images", function (error, response, body) {
	if (error || response.statusCode != 200) {
		message.channel.send("?images konnte nicht geladen werden... :(");
	} else {
		message.channel.send({
			files: ["https://rms.sexy" + JSON.parse(body)[Math.floor(Math.random()*JSON.parse(body).length)]]
		});
	};
});