request("http://explosm.net/rcg", function (error, response, body) {
	message.channel.send({
		files: ["http:" + cheerio.load(body)("#rcg-comic img").attr("src")]
	});
});