if (args && args != "") {
	request("https://www.omdbapi.com/?apikey=" + process.env.OMDB_TK + "&s=" + args.join(" "), function (error, response, body) {
		if (JSON.parse(body).Search) {
			request("https://www.omdbapi.com/?apikey=" + process.env.OMDB_TK + "&i=" + JSON.parse(body).Search[0].imdbID, function (error, response, body) {
				var temp = JSON.parse(body);
				message.channel.send({
					"embed": {
						"title": temp.Title + " (" + temp.Year + ")",
						"description": temp.Plot,
						"thumbnail": {
							"url": temp.Poster
						},
						"fields": [
							{
								"name": "Director",
								"value": temp.Director,
								"inline": true
							},
							{
								"name": "Release Date",
								"value": temp.Released,
								"inline": true
							},
							{
								"name": "Actors",
								"value": temp.Actors
							},
							{
								"name": "Genre",
								"value": temp.Genre,
								"inline": true
							},
							{
								"name": "Rating",
								"value": temp.Rated,
								"inline": true
							},
							{
								"name": "Runtime",
								"value": temp.Runtime,
								"inline": true
							},
							{
								"name": "Awards",
								"value": temp.Awards,
								"inline": true
							}
						]
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