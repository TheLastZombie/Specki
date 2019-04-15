if (message.channel.nsfw == false) {
	message.react("🔞");
} else {
	request("https://twitchlotto.com/static/js/bundle.d4481544.js", function (error, response, body) {
		eval(body.match(/Xg=\[\[".+?"\]\]/).toString());
		var Xg = [].concat.apply([], Xg);
		message.channel.send({
			files: [Xg[Math.floor(Math.random() * Xg.length)]]
		});
	});
};