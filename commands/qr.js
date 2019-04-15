if (args && args != "") {
	message.channel.send({
		files: [{
			attachment: "https://www.qrtag.net/api/qr.png?url=" + args.join(" "),
			name: "qr.png"
		}]
	});
} else {
	message.react("❎");
};
