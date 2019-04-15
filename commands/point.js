request("https://pointerpointer.com/gridPositions.json", function (error, response, body) {
	message.channel.send({
		files: ["https://pointerpointer.com/images/" + JSON.parse(body).map(x => x.src)[Math.floor(Math.random() * JSON.parse(body).map(x => x.src).length)]]
	});
});
