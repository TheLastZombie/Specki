message.channel.send({
	embed: {
		author: {
			name: client.user.username,
			icon_url: client.user.avatarURL
		},
		url: "https://rsch.neocities.org",
		fields: [
			{
				name: "Website",
				value: "https://rsch.neocities.org",
				inline: true
			},
			{
				name: "Bot List",
				value: "https://discordbots.org/bot/548801589079572497",
				inline: true
			},
			{
				name: "Discord",
				value: "https://discord.gg/VmPbt3B",
				inline: true
			},
			{
				name: "GitHub",
				value: "https://github.com/TheLastZombie/Specki",
				inline: true
			},
			{
				name: "Wiki",
				value: "https://github.com/TheLastZombie/Specki/wiki",
				inline: true
			},
			{
				name: "Invite (Neccessary)",
				value: "https://discordapp.com/oauth2/authorize?client_id=548801516828491777&permissions=70380641&scope=bot",
				inline: true
			},
			{
				name: "Invite (Future-Proof)",
				value: "https://discordapp.com/oauth2/authorize?client_id=548801516828491777&permissions=8&scope=bot",
				inline: true
			}
		],
		footer: {
			icon_url: client.user.avatarURL,
			text: "v2.4.0 | " + client.guilds.size + "G, " + client.channels.size + "C, " + client.users.size + "U | Commit " + commid + " | by @ry#3082 using discord.js"
		}
	}
});
