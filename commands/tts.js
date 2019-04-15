if (args == false || args == "" || isplay.has(message.guild.id) || message.member.voiceChannel == undefined) {
	message.react("❎");
} else {
	message.member.voiceChannel.join().then(connection => {
		isplay.add(message.guild.id);
		request({
			url: "https://gateway-lon.watsonplatform.net/text-to-speech/api/v1/synthesize",
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Accept": "audio/mp3"
			},
			json: {
				"voice": "de-DE_BirgitV2Voice",
				"text": args.join(" ")
			},
			auth: {
				"user": "apikey",
				"pass": process.env.IBM_TK
			}
		}).pipe(fs.createWriteStream(__dirname + "/sounds/temp.mp3")).on("close", function () {
			connection.playFile(__dirname + "/sounds/temp.mp3").on("end", () => {
				message.member.voiceChannel.leave();
				isplay.delete(message.guild.id);
			});
		});
	}).catch(err => message.channel.send(err.toString()));
};
