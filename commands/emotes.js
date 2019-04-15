var temp = client.guilds.find("name", args.join(" "));
if (temp == undefined) {
	message.react("❎");
} else {
	message.channel.send("**Emotes in " + temp.name + "**\n" + temp.emojis.array().join(" "));
};
