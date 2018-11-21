if (args && args != "") {
	request("https://osu.ppy.sh/api/get_user?k=" + process.env.OSU_TK + "&u=" + args.join(" "), function (error, response, body) {
		var temp = JSON.parse(body)[0];
		if (temp) {
			var best = "";
			request("https://osu.ppy.sh/api/get_user_best?k=" + process.env.OSU_TK + "&u=" + args.join(" ") + "&limit=5", function (error, response, body) {
				var tbest = JSON.parse(body);
				getmap(0);
				function getmap(i) {
					if (tbest[i]) {
						request("https://osu.ppy.sh/api/get_beatmaps?k=" + process.env.OSU_TK + "&b=" + JSON.parse(body)[i].beatmap_id, function (error, reponse, body) {
							best += "[" + JSON.parse(body)[0].artist + " – " + JSON.parse(body)[0].title + " [" + JSON.parse(body)[0].version + "]" + "](https://osu.ppy.sh/beatmaps/" + JSON.parse(body)[0].beatmap_id + ") (Rank: " + tbest[i].rank + " · " + tbest[i].pp + " PP · Score: " + tbest[i].score + ")\n";
							getmap(i + 1);
						});
					} else {
						var recent = "";
						request("https://osu.ppy.sh/api/get_user_recent?k=" + process.env.OSU_TK + "&u=" + args.join(" ") + "&limit=5", function (error, response, body) {
							var trecent = JSON.parse(body);
							getmapr(0);
							function getmapr(i) {
								if (trecent[i]) {
									request("https://osu.ppy.sh/api/get_beatmaps?k=" + process.env.OSU_TK + "&b=" + JSON.parse(body)[i].beatmap_id, function (error, reponse, body) {
										recent += "[" + JSON.parse(body)[0].artist + " – " + JSON.parse(body)[0].title + " [" + JSON.parse(body)[0].version + "]" + "](https://osu.ppy.sh/beatmaps/" + JSON.parse(body)[0].beatmap_id + ") (Rank: " + trecent[i].rank + " · Score: " + trecent[i].score + ")\n";
										getmapr(i + 1);
									});
								} else {
									message.channel.send({
										"embed": {
											"color": "13390472",
											"author": {
												"name": temp.username,
												"url": "https://osu.ppy.sh/users/" + temp.user_id,
												"icon_url": "http://s.ppy.sh/a/" + temp.user_id
											},
											"fields": [
												{
													"name": "Level",
													"value": temp.level,
													"inline": true
												},
												{
													"name": "Global Rank",
													"value": temp.pp_rank,
													"inline": true
												},
												{
													"name": "Local Rank",
													"value": temp.pp_country_rank,
													"inline": true
												},
												{
													"name": "PP",
													"value": temp.pp_raw,
													"inline": true
												},
												{
													"name": "Plays",
													"value": temp.playcount,
													"inline": true
												},
												{
													"name": "Accuracy",
													"value": temp.accuracy,
													"inline": true
												},
												{
													"name": "Ranks",
													"value": "SS: " + temp.count_rank_ss + " · SSH: " + temp.count_rank_ssh + " · S: " + temp.count_rank_s + " · SH: " + temp.count_rank_sh + " · A: " + temp.count_rank_a,
													"inline": true
												},
												{
													"name": "Country",
													"value": temp.country.split("").map(x => String.fromCodePoint(x.charCodeAt(0) + 127397)).join(""),
													"inline": true
												},
												{
													"name": "Best",
													"value": ((best) ? best : "❎ No best beatmaps found!")
												},
												{
													"name": "Recent",
													"value": ((recent) ? recent : "❎ No recent beatmaps found!")
												}
											]
										}
									});
								};
							};
						});
					};
				};
			});
		} else {
			message.react("❎");
		};
	});
} else {
	message.react("❎");
};
