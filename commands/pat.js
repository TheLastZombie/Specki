request("http://headp.at/js/pats.json", function (error, response, body) {
	if (error || response.statusCode != 200) {
		message.channel.send("Error while loading pats.json... UwU");
	} else {
		message.channel.send({
			files: ["http://headp.at/pats/" + JSON.parse(body)[Math.floor(Math.random()*JSON.parse(body).length)]]
		});
	};
});