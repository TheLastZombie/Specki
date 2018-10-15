if (args.length > 1) {
	var temp = args[0];
	args.shift();
	args = args.filter(Boolean);
	message.channel.send(args.join(" " + temp + " "));
} else if (args.length == 1) {
	message.channel.fetchMessages({
		limit: 2
	}).then(temp => {
		message.channel.send(temp.last().content.split(/ /g).join(" " + args + " "));
	});
};