if (args && args != "") {
	message.channel.send("wenn du ***" + args.join(" ").split("").join(" ").toUpperCase() + " " + args.join(" ").split("")[args.join(" ").split("").length - 1].toUpperCase() + "***");
} else {
	message.react("❎");
};