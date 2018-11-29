if (args && args != "") {
	request("https://spdx.org/licenses/licenses.json", function (error, response, body) {
		var temp = JSON.parse(body).licenses;
		var tmsg = temp.map(x => x.licenseId).indexOf(args.join(" "));
		if (tmsg == -1) {
			message.react("❎");
		} else {
			request(temp[tmsg].detailsUrl, function (error, response, body) {
				var temp = JSON.parse(body);
				message.channel.send({
					embed: {
						title: temp.name,
						description: (temp.licenseText.length > 2048) ? temp.licenseText.substr(0, 2047) + "…" : temp.licenseText,
						url: temp.seeAlso[0]
					}
				});
			});
		};
	});
} else {
	message.react("❎");
};