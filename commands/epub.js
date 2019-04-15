if (args && args != "") {
	var ilot;
	var lgen;
	request("https://xfmro77i3lixucja.onion.to/search/?q=" + args.join(" ") + "&fmt=json", function (error, response, body) {
		if (JSON.parse(body).found > 0) {
			ilot = "https://xfmro77i3lixucja.onion.to" + JSON.parse(body).books[0].download.replace(/ /g, "%20");
		};
		request("http://gen.lib.rus.ec/search.php?req=" + args.join(" "), function (error, response, body) {
			if (cheerio.load(body)(".c tr:nth-child(2)") != null) {
				request(cheerio.load(body)(".c tr:nth-child(2) td:nth-child(10) a").attr("href"), function (error, response, body) {
					var lgen = cheerio.load(body)("h2 a").attr("href");
					message.channel.send("**Imperial Library of Trantor:** " + (ilot ? ilot : "No results found!") + "\n**Library Genesis:** " + (lgen ? lgen : "No results found!"));
				});
			} else {
				message.channel.send("**Imperial Library of Trantor:** " + (ilot ? ilot : "No results found!") + "\n**Library Genesis:** " + (lgen ? lgen : "No results found!"));
			};
		});
	});
} else {
	message.react("❎");
};
