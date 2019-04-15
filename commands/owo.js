if (args && args != "") {
	neko.sfw.OwOify({
		text: args.join(" ")
	}).then(function(temp) {
		message.channel.send(temp.owo);
	});
} else {
	message.channel.fetchMessages({
		limit: 2
	}).then(temp => {
		neko.sfw.OwOify({
			text: temp.last().content
		}).then(function(temp) {
			message.channel.send(temp.owo);
		});
	});
};