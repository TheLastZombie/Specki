if (args && args != "") {
	if (args[1] == undefined || args[1] == "all") args[1] = "overall";
	if (args[1] == "week" || args[1] == "1week" || args[1] == "7days") args[1] = "7day";
	if (args[1] == "month") args[1] = "1month";
	if (args[1] == "3months") args[1] = "3month";
	if (args[1] == "6months") args[1] = "6month";
	if (args[1] == "year" || args[1] == "1year" || args[1] == "12months") args[1] = "12month";
	if (["overall", "7day", "1month", "3month", "6month", "12month"].includes(args[1])) {
		lastfm.request("user.getTopTracks", {
			user: args[0],
			period: args[1],
			limit: 10,
			handlers: {
				success: function (data) {
					var msg = data.toptracks.track.map(x => "[" + x.artist.name + " – " + x.name + "](" + x.url.replace(/\)/g, "\\)") + ") (" + x.playcount + " plays)").join("\n");
					message.channel.send({
						embed: {
							title: "Top tracks listened to by " + args[0] + " (" + args[1] + ")",
							description: (msg.length > 2048 ? msg.substring(0, 2047) + "…" : msg)
						}
					});
				},
				error: function (error) {
					message.channel.send("Last.fm error: " + error.message);
				}
			}
		});
	} else {
		message.channel.send("Internal error: Invalid timeframe provided!\nExpected **overall**, **7day**, **1month**, **3month**, **6month** or **12month** but got **" + args[1] + "**.");
	};
} else {
	message.channel.send("Internal error: No username specified, database isn't implemented yet!");
};
