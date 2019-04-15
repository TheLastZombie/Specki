request("http://archillect.com/", function (error, response, body) {
	var temp = Math.floor(Math.random() * body.match(/<div class="overlay"> \d+ <\/div>/).toString().slice(22, -7)) + 1;
	request("http://archillect.com/" + temp, function (error, response, body) {
		message.channel.send("Archillect \\|\\|\\| " + temp + " \\|\\|\\| <http://archillect.com/" + temp + ">", {
			files: [body.match(/<img id="ii" src=.+ \/>/).toString().slice(17, -3)]
		});
	});
});
