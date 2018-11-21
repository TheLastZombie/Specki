if (args && args != "") {
	if (isplay.has(message.guild.id)) {
		message.react("❎");
	} else {
		message.member.voiceChannel.join().then(connection => {
			isplay.add(message.guild.id);
			//roesch keine ahnung wie man das macht ruf hier das python skript auf und reade den output, das ist dann der dateipfad zur mp3
			//den auszugebenden text gibt man dann als argument, also wäre das dann shell("python3 tts.py \"" + args.join(" ") + "\"")
			connection.playFile("tts_cache/" + "das was das skript outputtet").on("end", () => {
				message.member.voiceChannel.leave();
				isplay.delete(message.guild.id);
			});
		}).catch(err => message.channel.send(err));
	};
