var temp = client.guilds.find("name", args.join(" "));
if (temp == undefined) {
	message.react("❎");
} else {
	message.channel.send("**Channels in " + temp.name + "**\n" + temp.channels.map(chn => "[" + chn.position + "] [" + chn.type + "] " + chn.name).join("\n"));
};
