if (args && args != "") {
	if (isplay.has(message.guild.id) || fs.existsSync(__dirname + "/sounds/" + args.join(" ").toLowerCase() + ".mp3") == false || message.member.voiceChannel == undefined) {
		message.react("❎");
	} else {
		message.member.voiceChannel.join().then(connection => {
			isplay.add(message.guild.id);
			connection.playFile(__dirname + "/sounds/" + args.join(" ").toLowerCase() + ".mp3").on("end", () => {
				setTimeout(function() {
					message.member.voiceChannel.leave();
					isplay.delete(message.guild.id);
				}, 2500);
			});
		}).catch(err => message.channel.send(err));
	};
} else {
	fs.readdir(__dirname + "/sounds/", (err, files) => {
		message.channel.send("**Available Sounds:**\n" + files.map(x => path.parse(x).name).join(", ") + "\n\n**More Information:**\n<https://github.com/TheLastZombie/Specki/wiki/Sounds-🇺🇸>")
	});
};
