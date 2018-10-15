var temp = [" und stirbt sofort.", " und stirbt wenig später im Krankenhaus.", ", fällt ins Koma ... und stirbt 3 Wochen später.", ", fällt ins Koma ... und stirbt 3 Monate später.", ", fällt ins Koma ... und stirbt 3 Jahre später.", ", fällt ins Koma ... und wacht 3 Wochen später wieder auf.", ", fällt ins Koma ... und wacht 3 Monate später wieder auf.", ", fällt ins Koma ... und wacht 3 Jahre später wieder auf.", " und kommt ins Krankenhaus, aber überlebt.", " und wird nur leicht verletzt.", ", wird aber verfehlt."];
if (args && args != "") {
	message.channel.send("**" + args.join(" ") + "** wird von **" + message.guild.member(message.author).displayName + "** angeschossen" + temp[Math.floor(Math.random() * temp.length)]);
} else {
	message.channel.send("**" + message.guild.member(message.author).displayName + "** schießt auf sich selbst" + temp[Math.floor(Math.random() * temp.length)]);
};