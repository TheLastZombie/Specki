if (message.guild) {
    message.channel.send(cool() + " " + message.guild.members.random().displayName + " " + args.join(" "));
} else {
	message.react("❎");
};
