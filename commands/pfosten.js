if (args && args != "") {
	request("https://www.reddit.com/r/" + args.join(" ") + "/random/.json", function (error, response, body) {
		try {
			if (JSON.parse(body)[0]["data"]["children"][0]["data"]["over_18"] == true && message.channel.nsfw == false) {
				message.react("🔞");
			} else {
				message.channel.send({
					"embed": {
						"title": JSON.parse(body)[0]["data"]["children"][0]["data"]["title"],
						"description": JSON.parse(body)[0]["data"]["children"][0]["data"]["selftext"],
						"fields": [{
								"name": "Subreddit",
								"value": JSON.parse(body)[0]["data"]["children"][0]["data"]["subreddit"],
								"inline": true
							},
							{
								"name": "Author",
								"value": JSON.parse(body)[0]["data"]["children"][0]["data"]["author"],
								"inline": true
							},
							{
								"name": "Date",
								"value": new Date(JSON.parse(body)[0]["data"]["children"][0]["data"]["created"] * 1000).toISOString().replace(/T/, " ").replace(/\..+/, ""),
								"inline": true
							},
							{
								"name": "Votes",
								"value": "▲ " + JSON.parse(body)[0]["data"]["children"][0]["data"]["ups"] + " | " + JSON.parse(body)[0]["data"]["children"][0]["data"]["downs"] + " ▼",
								"inline": true
							},
							{
								"name": "Activity",
								"value": "🗩 " + JSON.parse(body)[0]["data"]["children"][0]["data"]["num_comments"] + " | " + JSON.parse(body)[0]["data"]["children"][0]["data"]["num_crossposts"] + " ✕",
								"inline": true
							},
							{
								"name": "Link",
								"value": "https://redd.it/" + JSON.parse(body)[0]["data"]["children"][0]["data"]["id"],
								"inline": true
							}
						],
						"image": {
							"url": JSON.parse(body)[0]["data"]["children"][0]["data"]["url"]
						}
					}
				});
			};
		}
		catch(error) {
			message.channel.send(error);
		};
	});
};