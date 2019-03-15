if (args && args != "") {
	var collect = "";
	try {
		client.guilds.find("name", args.join(" ")).fetchInvites().then(function(invites) {
			if (invites.array().length > 0) {
				collect += "**Invites for " + invites.array()[0].guild.name + "**\n";
				for (index in invites.array()) {
					collect += invites.array()[index].url + " (Channel: " + invites.array()[index].channel + ", Creator: " + invites.array()[index].inviter + ")\n";
				};
				message.channel.send(collect);
			} else {
				client.guilds.find("name", args.join(" ")).channels.first().createInvite().then(function(invite) {
					message.channel.send("**New Invite for " + invite.guild.name + "**\n" + invite.url + " (Channel: " + invite.channel + ", Creator: " + invite.inviter + ")\n");
				});
			};
		});
	} catch(e) {
		message.channel.send("Could neither get existing invites nor create a new one, likely due to insufficient permissions.");
	};
} else {
	message.react("❎");
};
