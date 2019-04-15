if (args && args != "") {
	lyricist.search(encodeURIComponent(args.join(" "))).then(function(results) {
		if (results.length != 0) {
			lyricist.song(results[0].id, {
				fetchLyrics: true
			}).then(function(song) {
	            message.channel.send({
	                embed: {
	                    title: song.primary_artist.name + " – " + song.title,
	                    description: (song.lyrics.length > 2048 ? song.lyrics.substring(0, 2047) + "…" : song.lyrics),
	                    url: song.url,
	                    thumbnail: {
	                        url: song.song_art_image_url
	                    }
	                }
	            });
			});
		} else {
			message.react("❎");
		};
	});
} else {
	message.react("❎");
};