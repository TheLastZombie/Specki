if (args && args != "") {
	if (["overall", "7day", "1month", "3month", "6month", "12month"].includes(args[1])) {
		lastfm.request("user.getTopTracks", {
			user: args[0],
			period: args[1],
			limit: 10,
			handlers: {
				success: function (data) {
					var msg = data.toptracks.track.map(x => "[" + x.artist.name + " – " + x.name + "](" + x.url.replace(/\)/g, "\\)") + ") (played " + x.playcount + " times)").join("\n");
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
