if (message.channel.nsfw == false) {
	message.react("🔞");
} else {
	if (args && args != "") {
		request({
			url: "https://capi-beta.sankakucomplex.com/post/index.json?tags=" + encodeURIComponent(args.join("+")),
			headers: {
				"User-Agent": "TheLastZombie/ich_iel"
			}
		}, function (error, response, body) {
			try {
				var temp = JSON.parse(body)[Math.floor(Math.random() * JSON.parse(body).length)];
				message.channel.send({
					"embed": {
						"title": temp.title,
						"description": temp.tags.map(x => x.name).join(", "),
						"fields": [{
								"name": "Uploader",
								"value": temp.author,
								"inline": true
							},
							{
								"name": "Posted",
								"value": new Date(temp.created_at.s * 1000).toISOString().replace(/T/, " ").replace(/\..+/, ""),
								"inline": true
							},
							{
								"name": "Link",
								"value": "https://chan.sankakucomplex.com/post/show/" + temp.id,
								"inline": true
							}
						],
						"image": {
							"url": temp.preview_url
						}
					}
				});
			}
			catch(error) {
				message.channel.send(error);
			};
		});
	};
};
