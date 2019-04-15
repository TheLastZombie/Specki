if (args && args != "") {
	neko.sfw["8Ball"]({
		text: args.join(" ")
	}).then(function(temp) {
		message.channel.send(temp.response, {
			files: [temp.url]
		});
	});
} else {
	message.channel.fetchMessages({
		limit: 2
	}).then(temp => {
		neko.sfw["8Ball"]({
			text: temp.last().content
		}).then(function(temp) {
			message.channel.send(temp.response, {
				files: [temp.url]
			});
		});
	});
};