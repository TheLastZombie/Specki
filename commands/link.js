if (args && args != "") {
	message.channel.send(args.join(" ").match(/r\/\w+/g).map(i => "<https://www.reddit.com/" + i + ">").join("\n"));
} else {
	message.channel.fetchMessages({
		limit: 2
	}).then(temp => {
		message.channel.send(temp.last().content.match(/r\/\w+/g).map(i => "<https://www.reddit.com/" + i + ">").join("\n"));
	});
};