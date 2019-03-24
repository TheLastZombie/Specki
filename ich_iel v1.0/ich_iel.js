var bot = require("discord.io");
bot = new bot.Client({
	token: process.env.TOKEN,
	autorun: true
});
bot.on("ready", function(event) {
	console.log("\nErfolgreich eingeloggt als %s (%s).\n", bot.username, bot.id);
	console.log(JSON.stringify(bot, null, 4) + "\n");
});
bot.on("message", function(user, userID, channelID, message, rawEvent) {
	if (bot.id == userID) {
		if (bot.channels[channelID]) {
			console.log("Neue Nachricht von %s (%s) in Kanal %s (%s):\n\n" + JSON.stringify(rawEvent, null, 4) + "\n", user, userID, bot.channels[channelID].name, channelID);
		} else {
			console.log("Neue Privatnachricht (%s) von %s (%s):\n\n" + JSON.stringify(rawEvent, null, 4) + "\n", channelID, user, userID);
		};
		console.log("Nachricht wurde nicht verarbeitet, da sie vom Bot selbst gesendet wurde.\n");
	} else {
		if (bot.channels[channelID]) {
			console.log("Neue Nachricht von %s (%s) in Kanal %s (%s):\n\n" + JSON.stringify(rawEvent, null, 4) + "\n", user, userID, bot.channels[channelID].name, channelID);
		} else {
			console.log("Neue Privatnachricht (%s) von %s (%s):\n\n" + JSON.stringify(rawEvent, null, 4) + "\n", channelID, user, userID);
		};
		if (message.substring(0, 1) == "$") {
			var command = message.substring(1);
			if (command.match(/@everyone/) || command.match(/@here/)) {
				console.log("Nachricht wurde nicht verarbeitet, da sie eine/mehrere Massen-Erwähnung/en enthält.\n");
					bot.sendMessage({
						to: channelID,
						message: "`Nachricht wurde nicht verarbeitet, da sie eine/mehrere Massen-Erwähnung/en enthält.`"
					});
				return;
			};
			if (command.substring(0, 4).toLowerCase() == "huso") {
				console.log("Nachricht wird als $huso-Command verarbeitet.\n");
				if (command.substring(4).trim()) {
					bot.sendMessage({
						to: channelID,
						message: "Wie " + command.substring(4).trim() + ", du Hurensohn?"
					});
				} else {
					bot.getMessages({
						channelID: channelID,
						limit: 2
					}, function(error, messageArray) {
						if (messageArray[1].content.trim()) {
							bot.sendMessage({
								to: channelID,
								message: "Wie " + messageArray[1].content.trim() + ", du Hurensohn?"
							});
						} else {
							bot.sendMessage({
								to: channelID,
								message: "Wie gibt's nicht, du Hurensohn?"
							});
						};
					});
				};
			};
			if (command.substring(0, 6).toLowerCase() == "schuss") {
				console.log("Nachricht wird als $schuss-Command verarbeitet.\n");
				var temp = [" und stirbt sofort.", " und stirbt wenig später im Krankenhaus.", ", fällt ins Koma ... und stirbt 3 Wochen später.", ", fällt ins Koma ... und stirbt 3 Monate später.", ", fällt ins Koma ... und stirbt 3 Jahre später.", ", fällt ins Koma ... und wacht 3 Wochen später wieder auf.", ", fällt ins Koma ... und wacht 3 Monate später wieder auf.", ", fällt ins Koma ... und wacht 3 Jahre später wieder auf.", " und kommt ins Krankenhaus, aber überlebt.", " und wird nur leicht verletzt.", ", wird aber verfehlt."];
				if (bot.channels[channelID]) {
					if (bot.servers[bot.channels[channelID].guild_id].members[command.match(/\d+/g)]) {
						bot.sendMessage({
							to: channelID,
							message: "**" + bot.users[command.match(/\d+/g)[0]].username + "** wird von **" + user + "** angeschossen" + temp[Math.floor(Math.random() * temp.length)]
						});
					} else if (command.substring(6).trim()) {
						bot.sendMessage({
							to: channelID,
							message: "**" + command.substring(6).trim() + "** wird von **" + user + "** angeschossen" + temp[Math.floor(Math.random() * temp.length)]
						});
					} else {
						bot.sendMessage({
							to: channelID,
							message: "**" + user + "** schießt auf sich selbst" + temp[Math.floor(Math.random() * temp.length)]
						});
					};
				} else {
					if (bot.users[command.match(/\d+/g)]) {
						bot.sendMessage({
							to: channelID,
							message: "**" + bot.users[command.match(/\d+/g)[0]].username + "** wird von **" + user + "** angeschossen" + temp[Math.floor(Math.random() * temp.length)]
						});
					} else if (command.substring(6).trim()) {
						bot.sendMessage({
							to: channelID,
							message: "**" + command.substring(6).trim() + "** wird von **" + user + "** angeschossen" + temp[Math.floor(Math.random() * temp.length)]
						});
					} else {
						bot.sendMessage({
							to: channelID,
							message: "**" + user + "** schießt auf sich selbst" + temp[Math.floor(Math.random() * temp.length)]
						});
					};
				};
			};
			if (command.substring(0, 5).toLowerCase() == "kerle") {
				console.log("Nachricht wird als $kerle-Command verarbeitet.\n");
				if (command.substring(5).trim()) {
					bot.sendMessage({
						to: channelID,
						message: "Es ist " + command.substring(5).trim() + ", meine Kerle!"
					});
				} else {
					var temp = new Date();
					bot.sendMessage({
						to: channelID,
						message: "Es ist " + ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"][temp.getDay()] + ", meine Kerle!"
					});
				};
			};
			if (command.substring(0, 5).toLowerCase() == "spott") {
				console.log("Nachricht wird als $spott-Command verarbeitet.\n");
				var temp;
				if (command.substring(5).trim()) {
					temp = command.substring(5).trim().replace(/\n+/g, " ").match(/.{1}/g);
				for (indx = 0; indx < temp.length; indx++) {
					if (indx % 2 == false) {
						temp[indx] = temp[indx].toUpperCase();
					} else {
						temp[indx] = temp[indx].toLowerCase();
					};
				};
				temp = temp.join("");
				bot.sendMessage({
					to: channelID,
					message: temp
				});
				} else {
					bot.getMessages({
						channelID: channelID,
						limit: 2
					}, function(error, messageArray) {
						temp = messageArray[1].content.trim().replace(/\n/g, " ").match(/.{1}/g);
						for (indx = 0; indx < temp.length; indx++) {
							if (indx % 2 == false) {
								temp[indx] = temp[indx].toUpperCase();
							} else {
								temp[indx] = temp[indx].toLowerCase();
							};
						};
						temp = temp.join("");
						bot.sendMessage({
							to: channelID,
							message: temp
						});
					});
				};
			};
			if (command.substring(0, 5).toLowerCase() == "ibims") {
				console.log("Nachricht wird als $ibims-Command verarbeitet.\n");
				if (command.substring(5).trim()) {
					bot.sendMessage({
						to: channelID,
						message: "I bims, 1 " + command.substring(5).trim() + "!"
					});
				} else {
					bot.sendMessage({
						to: channelID,
						message: "I bims, 1 " + user + "!"
					});
				};
			};
			if (command.substring(0, 7).toLowerCase() == "ichmach") {
				console.log("Nachricht wird als $ichmach-Command verarbeitet.\n");
				if (bot.channels[channelID] && channelID != 395018826292527115) {
					console.log("Nachricht wurde nicht verarbeitet, da sie nicht aus dem #botspam-Kanal stammt.\n");
					bot.sendMessage({
						to: channelID,
						message: "`Nachricht wurde nicht verarbeitet, da sie nicht aus dem #botspam-Kanal stammt.`"
					});
				} else {
					if (command.substring(7).trim()) {
						var temp = command.substring(7).trim();
					} else {
						var temp = "Scheine";
					};
					bot.sendMessage({
						to: channelID,
						message: "Bitte Objektiv beurteilen hab jetzt lange dafür gebraucht Stellt euch den Beat vor die Hook ist mit AutoTune\n\ney ey ich mach " + temp + " ey ey ich mach " + temp + " ey ey ich mach " + temp + " ey ey ich mach " + temp + " ey ey ich mach " + temp + " ey ey ich mach " + temp + " Ich rappe und mache Krieg wie '39 und bin beim Dealen fleißig Ich hatte mit vielen Frauen Sex und saufe Wodka Bull auf Ex ey ey ich mach " + temp + " ey ey ich mach " + temp + " ey ey ich mach " + temp + " ey ey ich mach " + temp + " ey ey ich mach " + temp + " ey ey ich mach " + temp + " Wer mich fikt den fike ich zurück Eyyyy Brudi mach nicht so auf 31er den ich komm in Haus und mach Schaden mit Waffe yooooohhhooo Wallah ich schiesse mit 5 kancken auf dein Haus ey ey ich mach " + temp + " ey ey ich mach " + temp + " ey ey ich mach " + temp + " ey ey ich mach " + temp + " ey ey ich mach " + temp + " ey ey ich mach " + temp + " Ich mache mit Koks Para und fike und Porsche Pana Ich nehm Drogen ala MDMA HEROIN COCAIN DOPE CRYSTAL und rauche denn Stoff gib mir den J und deine Mutter gibt mir Shoot So habe ich euch gefikkt yea yea Cho"
					});
				};
			};
			if (command.substring(0, 6).toLowerCase() == "mcname") {
				console.log("Nachricht wird als $mcname-Command verarbeitet.\n");
				if (bot.channels[channelID]) {
					if (bot.servers[bot.channels[channelID].guild_id].members[command.match(/\d+/g)]) {
							var temp = bot.users[command.match(/\d+/g)[0]].username;
					} else if (command.substring(6).trim()) {
							var temp = command.substring(6).trim();
					} else {
							var temp = user;
					};
				} else {
					if (bot.users[command.match(/\d+/g)]) {
							var temp = bot.users[command.match(/\d+/g)[0]].username;
					} else if (command.substring(6).trim()) {
							var temp = command.substring(6).trim();
					} else {
							var temp = user;
					};
				};
				name = temp.replace(/\s+/g, "").replace(/\t+/g, "").replace(/\n+/g, "");
				if (Math.random() > 0.5) {
					name = "iTz" + name;
				}
				if (Math.random() > 0.5) {
					name = name + "LP";
				};
				if (Math.random() > 0.5) {
					name = name + "HD";
				};
				if (Math.random() > 0.5) {
					name = name + "69";
				};
				if (Math.random() > 0.5) {
					name = name + "420";
				};
				if (Math.random() > 0.5 || name == temp.replace(/\s+/g, "").replace(/\t+/g, "").replace(/\n+/g, "")) {
					name = "xXx_" + name + "_xXx";
				};
				bot.sendMessage({
					to: channelID,
					message: "**" + temp.replace(/\n/g, " ") + "**s neuer, cooler Minecraft-Name ist ab jetzt **" + name + "**!"
				});
			};
			if (command.substring(0, 6).toLowerCase() == "ersatz") {
				console.log("Nachricht wird als $ersatz-Command verarbeitet.\n");
				if (command.substring(6).trim()) {
					bot.sendMessage({
						to: channelID,
						message: command.substring(6).trim().replace(/aus/gi, "<:1aus:403611412938620929>").replace(/gel/gi, "<:2gel:403611412586430474>").replace(/öst/gi, "<:3oest:403611413022638081>").replace(/err/gi, "<:2err:406902951064371211>").replace(/eich/g, "<:3eich:406902925764460544>").replace(/nuss/gi, "<:NUSS:402536220074180609>").replace(/schwul/gi, "<:schwul:406965196687671297>").replace(/verbessern/gi, "<:verbessern:403900299514740746>").replace(/xd/gi, "<:Xd:424962963095552000>").replace(/perfekt/gi, "<:perfekt:408736206885748736>").replace(/notiz beachten/gi, "<:notizbeachten:402532937221931008>").replace(/null/gi, "<:null:400375286451142656>").replace(/nein/gi, "<:NEIN:416727817623961610>").replace(/lösc dies/gi, "<:loesc_dies:406958134771580938>").replace(/fick geh zurück/gi, "<:fickgehzurueck:403900299087183872>")
					});
				} else {
					bot.getMessages({
						channelID: channelID,
						limit: 2
					}, function(error, messageArray) {
						bot.sendMessage({
							to: channelID,
							message: messageArray[1].content.trim().replace(/aus/gi, "<:1aus:403611412938620929>").replace(/gel/gi, "<:2gel:403611412586430474>").replace(/öst/gi, "<:3oest:403611413022638081>").replace(/err/gi, "<:2err:406902951064371211>").replace(/eich/gi, "<:3eich:406902925764460544>").replace(/nuss/gi, "<:NUSS:402536220074180609>").replace(/schwul/gi, "<:schwul:406965196687671297>").replace(/verbessern/gi, "<:verbessern:403900299514740746>").replace(/xd/gi, "<:Xd:424962963095552000>").replace(/perfekt/gi, "<:perfekt:408736206885748736>").replace(/notiz beachten/gi, "<:notizbeachten:402532937221931008>").replace(/null/gi, "<:null:400375286451142656>").replace(/nein/gi, "<:NEIN:416727817623961610>").replace(/lösc dies/gi, "<:loesc_dies:406958134771580938>").replace(/fick geh zurück/gi, "<:fickgehzurueck:403900299087183872>")
						});
					});
				};
			};
			if (command.substring(0, 5).toLowerCase() == "hilfe" || command.substring(0, 4).toLowerCase() == "help") {
				console.log("Nachricht wird als $hilfe- bzw. $help-Command verarbeitet.\n");
				bot.sendMessage({
					to: channelID,
					message: "**Verfügbare Befehle**\n\n`$ersatz [Text]`\nErsetzt \"AUS\", \"GEL\", \"ÖST\", etc. mit den entsprechenden Emojis.\n\n`$huso [Text]`\nWie [Text], du Hurensohn? Optional mit Text.\n\n`$ibims [Text]`\nI bims, 1 [Text]! Optional mit angefügtem Text.\n\n`$ichmach [Text]`\nIch mach [Text] ey ey, optional mit Text. Inspiriert von Gloryholei55. Nur in <#395018826292527115>.\n\n`$kerle [Text]`\nEs ist [Text], meine Kerle! Aktueller Wochentag bei keiner Texteingabe.\n\n`$mcname [User]`\nGeneriere einen \"coolen\" Minecraft-Namen, wie \"xXx_iTz[User]LPHD69420_xXx\".\n\n`$schuss [User]`\nSchieße auf jemanden und erfahre sein Schicksal.\n\n`$spott [Text]`\nVerspottet die vorherige Nachricht oder den angefügten Text.\n\n**Über diesen Roboter**\n\nProgrammiert von <@!175877241517899776> mithilfe von discord.io: https://github.com/woor/discord.io.\nBitte beachte, dass sich der Roboter momentan in der Beta-Phase befindet und deswegen evtl. nicht alles einwandfrei funktioniert.\nUm Spam und genervte Nutzer vorzubeugen, wird auf Nachrichten mit Massen-Erwähnungen nicht reagiert.\n\n**Was Nutzer sagen**\n\n*\"nicht  jeder kann so gute bots programieren wie <@!175877241517899776>\"*"
				});
			};
		} else {
			console.log("Nachricht startet nicht mit $ und wurde demnach nicht als Command verarbeitet.\n");
		};
	};
});