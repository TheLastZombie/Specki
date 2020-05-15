if (args && args != "") {
    request("https://raw.githubusercontent.com/jdm-contrib/jdm/master/_data/sites.json", function (error, response, body) {
        var temp = new Fuse(JSON.parse(body), {
            keys: ["name"]
        }).search(args.join(" "))[0].item;
        if (temp == undefined) {
            message.react("❎");
            return;
        };
        message.channel.send({
            embed: {
                title: temp.name,
                description: temp.notes || "No details or other notes found. Likely deleting your account is as simple as visiting the link below.",
                fields: [
                    {
                        name: "Website",
                        value: "https://" + temp.domains[0],
                        inline: true
                    },
                    {
                        name: "JDM URL",
                        value: temp.url,
                        inline: true
                    }
                ],
                color: {
                    easy: "8105083",
                    medium: "15255156",
                    hard: "13648707",
                    impossible: "2829099"
                }[temp.difficulty],
                footer: {
                    text: temp.difficulty.charAt(0).toUpperCase() + temp.difficulty.slice(1) + " · Data provided by Just Delete Me, a directory of direct links for account deletion."
                }
            }
        });
    });
} else {
    message.react("❎");
};
