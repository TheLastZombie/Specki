if (args && args != "") {
	request("https://aur.archlinux.org/rpc/?v=5&type=info&arg[]=" + args.join(" "), function (error, response, body) {
		var temp = JSON.parse(body).results[0];
		if (temp) {
			message.channel.send({
				embed: {
					title: temp.Name + " " + temp.Version,
					description: temp.Description,
					url: "https://aur.archlinux.org/packages/" + temp.Name
				}
			});
		} else {
			message.react("❎");
		};
	});
} else {
	message.react("❎");
};