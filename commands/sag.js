if (args && args != "") {
	message.channel.send("Sag " + args.join(" ") + " zurück 🔫 <:uff_kaputt:402413360748036128>");
} else {
	message.channel.fetchMessages({
		limit: 2
	}).then(temp => {
		message.channel.send("Sag " + temp.last().content + " zurück 🔫 <:uff_kaputt:402413360748036128>");
	});
};