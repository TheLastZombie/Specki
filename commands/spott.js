if (args && args != "") {
	var temp = args.join(" ").split("");
	for (indx = 0; indx < temp.length; indx++) {
		if (indx % 2 == false) {
			temp[indx] = temp[indx].toUpperCase();
		} else {
			temp[indx] = temp[indx].toLowerCase();
		};
	};
	temp = temp.join("");
	message.channel.send(temp);
} else {
	message.channel.fetchMessages({
		limit: 2
	}).then(temp => {
		var temp = temp.last().content.split("");
		for (indx = 0; indx < temp.length; indx++) {
			if (indx % 2 == false) {
				temp[indx] = temp[indx].toUpperCase();
			} else {
				temp[indx] = temp[indx].toLowerCase();
			};
		};
		temp = temp.join("");
		message.channel.send(temp);
	});
};