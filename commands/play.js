if (args && args != "") {
	if (isplay) {
		message.react("❎");
	} else {
		message.member.voiceChannel.join().then(connection => {
			isplay = true;
			connection.playFile(__dirname + "/sounds/" + args.join(" ") + ".mp3").on("end", () => {
				message.member.voiceChannel.leave();
				isplay = false;
			});
		}).catch(err => message.channel.send(err));
	};
} else {
	message.channel.send("Eine Liste von Sounds kann unter https://github.com/TheLastZombie/ich_iel/wiki/Sounds-🇩🇪 gefunden werden.");
};