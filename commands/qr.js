if (args && args != "") {
	message.channel.send({
		files: ["https://www.qrtag.net/api/qr.png?url=" + args.join(" ")]
	});
} else {
	message.react("❎");
};
