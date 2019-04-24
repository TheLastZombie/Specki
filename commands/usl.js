if (args && args != "") {
    request("https://universalscammerlist.com/api/query.php?query=" + args.join(" ") + "&hashtags=%23scammer%2C%23sketchy%2C%23troll&format=2", function(error, response, body) {
        if (JSON.parse(body).success) {
            if (JSON.parse(body).data.history) {
                if (JSON.parse(body).data.history.length == 0) {
                    message.channel.send("✔️ User " + JSON.parse(body).data.person + " has a clean record.");
                } else {
                    message.channel.send("⚠️ User " + JSON.parse(body).data.person + " listed on scammer list due to the following reasons:\n```" + [...new Set(JSON.parse(body).data.history.map(x => x.description))].join("\n") + "```");
                };
            } else if (JSON.parse(body).data.description) {
                message.channel.send("⚠️ User " + JSON.parse(body).data.person + " listed on scammer list due to the following reason:\n```" + JSON.parse(body).data.description + "```");
            };
        } else {
            message.channel.send("❌ " + JSON.parse(body).error_type + ": " + JSON.parse(body).error_message);
        };
    });
} else {
    message.react("❎");
};