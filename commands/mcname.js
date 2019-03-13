if (args && args != "") {
	var temp = args.join(" ");
} else {
	var temp = message.guild.member(message.author).displayName;
};
name = temp.replace(/\s+/g, "");
if (Math.random() > 0.5) {
	name = "iTz" + name;
}
if (Math.random() > 0.5) {
	name = name + "LP";
};
if (Math.random() > 0.5) {
	name = name + "HD";
};
if (Math.random() > 0.5) {
	name = name + "69";
};
if (Math.random() > 0.5) {
	name = name + "420";
};
if (Math.random() > 0.5 || name == temp.replace(/\s+/g, "")) {
	name = "xXx_" + name + "_xXx";
};
message.channel.send("**" + temp.replace(/\s+/g, " ") + "**s new Minecraft nickname is now **" + name + "**!");