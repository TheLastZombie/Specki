if (args && args != "") {
	neko.sfw.chat({
		text: args.join(" ")
	}).then(function(temp) {
		message.channel.send(temp.response);
	});
} else {
	message.channel.fetchMessages({
		limit: 2
	}).then(temp => {
		neko.sfw.chat({
			text: temp.last().content
		}).then(function(temp) {
			message.channel.send(temp.response);
		});
	});
};