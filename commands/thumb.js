if (args.length == 2) {
	request(args[0]).pipe(fs.createWriteStream(__dirname + "/images/thumb.png")).on("close", function () {
		request(args[1]).pipe(fs.createWriteStream(__dirname + "/images/full.png")).on("close", function () {
			exec("doubleVision images/full.png images/thumb.png images/temp.png", function (err, stdout, stderr) {
				if (stderr) {
					message.channel.send("```" + stderr + "```");
				} else {
					message.channel.send({
						files: [{
							attachment: __dirname + "/images/temp.png",
							name: "thumb.png"
						}]
					});
				};
			});
		});
	});
} else {
	message.react("❎");
};
