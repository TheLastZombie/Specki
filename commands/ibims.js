if (args && args != "") {
	message.channel.send("I bims, 1 " + args.join(" ") + "!");
} else {
	message.channel.send("I bims, 1 " + message.member.displayName + "!");
};