if (args && args != "") {
	var period;
	if (["overall", "7day", "1month", "3month", "6month", "12month"].includes(args[1])) {
		period = args[1];
	} else {
		period = "overall";
	};
	lastfm.request("user.getTopTracks", {
		user: args[0],
		period: period,
		limit: 10,
		handlers: {
			success: function (data) {
				var msg = "**Top tracks listened to by " + args[0] + " (" + period + ")**\n" + data.toptracks.track.map(x => "[" + x.artist.name + " – " + x.name + "](" + x.url + ") (played " + x.playcount + " times)").join("\n");
				message.channel.send((msg.length > 2000 ? msg.substring(0, 1999) + "…" : msg));
			},
			error: function (error) {
				message.channel.send("Last.fm error: " + error.message);
			}
		}
	});
} else {
	message.channel.send("Internal error: No username specified, database isn't implemented yet!");
};
