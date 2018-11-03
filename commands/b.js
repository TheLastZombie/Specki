var temp;
if (args && args != "") {
	temp = args;
	for (var index = 0; index < temp.length; index++) {
		if (["B", "C", "D", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "V", "W", "X", "Z", "🅱"].includes(temp[index].charAt(0).toUpperCase())) {
			temp[index] = temp[index].replace(temp[index].charAt(0), "🅱");
		} else {
			temp[index] = "🅱" + temp[index];
		};
	};
	temp = temp.join(" ").replace(/B/gi, "🅱");
	message.channel.send(temp);
} else {
	message.channel.fetchMessages({
		limit: 2
	}).then(tmsg => {
		temp = tmsg.last().content.split(" ");
		for (var index = 0; index < temp.length; index++) {
			if (["B", "C", "D", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "V", "W", "X", "Z", "🅱"].includes(temp[index].charAt(0).toUpperCase())) {
				temp[index] = temp[index].replace(temp[index].charAt(0), "🅱");
			} else {
				temp[index] = "🅱" + temp[index];
			};
		};
		temp = temp.join(" ").replace(/B/gi, "🅱");
		message.channel.send(temp);
	});
};
