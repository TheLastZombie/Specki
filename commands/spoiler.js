if (/<.+>/.test(args.join(" "))) {
	message.delete().then(function() {
		var temp = args.join(" ");
		var match = temp.match(/<.+?>/g);
		var text = match.map(x => x.slice(1, -1));
		var urls = [];
		upload(0);
		function upload(index) {
			if (text[index]) {
				request({
					url: "https://snippets.glot.io/snippets",
					method: "POST",
					json: {
						"files": [{"content": text[index]}]
					}
				}, function (error, response, body) {
					urls[index] = "https://glot.io/snippets/" + body.id + "/raw";
					upload(index + 1);
				});
			} else {
				for (var i = 0; i < match.length; i++) {
					temp = temp.replace(match[i], "[Hover to View](" + urls[i] + " '" + text[i] + "')");
				};
				message.channel.send({
					embed: {
						description: temp
					}
				});
			};
		};
	});
} else {
	message.react("❎");
};