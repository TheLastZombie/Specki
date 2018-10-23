if (args && args != "") {
	if (isplay.has(message.guild.id) || fs.existsSync(__dirname + "/sounds/" + args.join(" ").toLowerCase() + ".mp3") == false) {
		message.react("❎");
	} else {
		message.member.voiceChannel.join().then(connection => {
			isplay.add(message.guild.id);
			connection.playFile(__dirname + "/sounds/" + args.join(" ").toLowerCase() + ".mp3").on("end", () => {
				message.member.voiceChannel.leave();
				isplay.delete(message.guild.id);
			});
		}).catch(err => message.channel.send(err));
	};
} else {
	message.channel.send("Eine Liste von Sounds kann unter https://github.com/TheLastZombie/ich_iel/wiki/Sounds-🇩🇪 gefunden werden.");
};
