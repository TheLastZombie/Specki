var endpsfw = ["smug", "baka", "tickle", "slap", "poke", "pat", "neko", "nekoGif", "meow", "lizard", "kiss", "hug", "foxGirl", "feed", "cuddle", "kemonomimi", "holo", "woof"];
var endpnsfw = ["randomHentaiGif", "pussy", "nekoGif", "neko", "lesbian", "kuni", "cumsluts", "classic", "boobs", "bJ", "anal", "avatar", "yuri", "trap", "tits", "girlSoloGif", "girlSolo", "smallBoobs", "pussyWankGif", "pussyArt", "kemonomimi", "kitsune", "keta", "holo", "holoEro", "hentai", "futanari", "femdom", "feetGif", "eroFeet", "feet", "ero", "eroKitsune", "eroKemonomimi", "eroNeko", "eroYuri", "cumArts", "blowJob", "pussyGif"];
if (args && args != "") {
	if (endpsfw.includes(args.join(" "))) {
		neko.sfw[args.join(" ")]().then(function(temp) {
			message.channel.send({
				files: [temp.url]
			});
		});
	} else if (endpnsfw.includes(args.join(" "))) {
		if (message.channel.nsfw == false) {
			message.react("🔞");
		} else {
			neko.nsfw[args.join(" ")]().then(function(temp) {
				message.channel.send({
					files: [temp.url]
				});
			});
		};
	} else {
		message.channel.send("**" + args.join(" ") + "** is not a valid method! Supported are: **" + endpsfw.concat(endpnsfw).join("**, **") + "**.");
	};
} else {
	message.channel.send("No method specified! Supported are: **" + endpsfw.concat(endpnsfw).join("**, **") + "**.");
};