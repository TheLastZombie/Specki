if (args && args != "") {
	request("https://osu.ppy.sh/api/get_user?k=" + process.env.OSU_TK + "&u=" + args.join(" "), function (error, response, body) {
		var temp = JSON.parse(body)[0];
		message.channel.send({
			"embed": {
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
						"value": temp.country,
						"inline": true
					}
				]
			}
		});
	});
} else {
	message.react("❎");
};
