if (args && args != "") {
	request("https://yiff.party/json/creators.json", function(error, response, body) {
		var temp = JSON.parse(body).creators.find(x => x.name.toLowerCase() == args.join(" ").toLowerCase());
		if (temp == undefined) {
			message.channel.send(args.join(" ") + " · <https://www.patreon.com/" + args.join("%20") + "> · not found");
		} else {
			message.channel.send(temp.name + " · <https://www.patreon.com/" + temp.name + "> · <https://yiff.party/" + temp.id + "> · " + temp.post_count + " posts, " + temp.shared_count + " files · last post: " + temp.last_post_ago);
		};
	});
} else {
	message.channel.send("error · no username supplied");
};
