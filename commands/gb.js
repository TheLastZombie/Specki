var temp = args.shift();
var endp = ["accessories", "characters", "companies", "concepts", "dlcs", "franchises", "games", "genres", "locations", "objects", "people", "platforms", "rating_boards", "regions", "releases", "videos", "video_categories"];
if (endp.includes(temp)) {
    request({
        url: "https://www.giantbomb.com/api/" + temp + "/?api_key=" + process.env.BOMB_TK + "&format=json&field_list=deck,image,name,site_detail_url&limit=1&filter=name:" + args.join(" "),
        headers: {
            "User-Agent": "TheLastZombie/Specki"
        }
    }, function (error, response, body) {
        if (JSON.parse(body).results.length > 0) {
            message.channel.send({
                embed: {
                    title: JSON.parse(body).results[0].name,
                    description: JSON.parse(body).results[0].deck,
                    url: JSON.parse(body).results[0].site_detail_url,
                    thumbnail: {
                        url: JSON.parse(body).results[0].image.original_url
                    }
                }
            });
        } else {
            message.react("❎");
        };
    });
} else {
    message.channel.send("**" + temp + "** is not a valid endpoint! Supported are: **" + endp.join("**, **") + "**.");
};