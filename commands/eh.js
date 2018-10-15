if (message.channel.nsfw == false) {
	message.react("🔞");
} else {
	if (args && args != "") {
		request("https://e-hentai.org/?f_search=" + encodeURIComponent(args.join(" ")), function (error, response, body) {
			try {
				var temp = body.match(/https:\/\/e-hentai\.org\/g\/[0-9]{7}\/[0-9a-f]{10}/g)[Math.floor(Math.random() * body.match(/https:\/\/e-hentai\.org\/g\/[0-9]{7}\/[0-9a-f]{10}/g).length)];
				if (temp) {
					request({
						url: "https://api.e-hentai.org/api.php",
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						json: {
							"method": "gdata",
							"gidlist": [
								[temp.match(/[0-9]{7}/).toString(), temp.match(/[0-9a-f]{10}/).toString()]
							],
							"namespace": 1
						}
					}, function (error, response, body) {
						message.channel.send({
							"embed": {
								"title": body.gmetadata[0].title,
								"description": body.gmetadata[0].tags.join(", "),
								"fields": [{
										"name": "Uploader",
										"value": body.gmetadata[0].uploader,
										"inline": true
									},
									{
										"name": "Posted",
										"value": new Date(body.gmetadata[0].posted * 1000).toISOString().replace(/T/, " ").replace(/\..+/, ""),
										"inline": true
									},
									{
										"name": "Rating",
										"value": body.gmetadata[0].rating + " / 5",
										"inline": true
									},
									{
										"name": "Category",
										"value": body.gmetadata[0].category,
										"inline": true
									},
									{
										"name": "Link",
										"value": "https://e-hentai.org/g/" + body.gmetadata[0].gid + "/" + body.gmetadata[0].token,
										"inline": true
									}
								],
								"image": {
									"url": body.gmetadata[0].thumb
								}
							}
						});
					});
				} else {
					message.react("❎");
				};
			}
			catch(error) {
				message.channel.send(error);
			};
		});
	};
};