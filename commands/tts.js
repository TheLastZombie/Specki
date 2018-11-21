if (args && args != "") {
	if (isplay.has(message.guild.id)) {
		message.react("❎");
	} else {
		message.member.voiceChannel.join().then(connection => {
			isplay.add(message.guild.id);
			googleTTS(args.join(" "), "de", 1).then(function (url) {
				connection.playFile(url).on("end", () => {
					message.member.voiceChannel.leave();
					isplay.delete(message.guild.id);
				});
			});
		}).catch(err => message.channel.send(err));
	};
};