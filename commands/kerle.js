if (args && args != "") {
	message.channel.send("Es ist " + args.join(" ") + ", meine Kerle!");
} else {
	var temp = new Date();
	message.channel.send("Es ist " + ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"][temp.getDay()] + ", meine Kerle!");
};