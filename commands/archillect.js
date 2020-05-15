request("http://archillect.com/", function (error, response, body) {
	var temp = Math.floor(Math.random() * body.match(/<a class="post" href="\/\d+">/).toString().slice(23, -2)) + 1;
	request("http://archillect.com/" + temp, function (error, response, body) {
		message.channel.send("Archillect \\|\\|\\| " + temp + " \\|\\|\\| <http://archillect.com/" + temp + ">", {
			files: [body.match(/<img id="ii" src=".+">/).toString().slice(18, -2)]
		});
	});
});
