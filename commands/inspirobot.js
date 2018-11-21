request("http://inspirobot.me/api?generate=true&season=" + args.join(" "), function (error, response, body) {
	message.channel.send({
		files: [body]
	});
});
