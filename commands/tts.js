if (args == false || args == "" || message.guild.voiceConnection || message.member.voiceChannel == undefined) {
	message.react("❎");
} else {
	message.member.voiceChannel.join().then(connection => {
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
				setTimeout(function() {
					message.member.voiceChannel.leave();
				}, 2500);
			});
		});
	}).catch(err => message.channel.send(err.toString()));
};
