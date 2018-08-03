const discord = require("discord.js");
const translate = require("google-translate-api");
const cool = require("cool-ascii-faces");
const request = require("request");
const figlet = require("figlet");
const zalgo = require("to-zalgo");
const tinycolor = require("tinycolor2");
const is = require("is-thirteen");
const client = new discord.Client({
	autoReconnect: true,
	disableEveryone: true
});
const talkedRecently = new Set();
var talkedTimestamp = {};
var commandCounts = {};
var commandSuccess;
var commitId;
function cycleActivity(){
	var games = ["Jerrynicki hat den großen Schwul", "/r/anti_iel > /r/ich_iel", "----- unt schw -----", "Ein Bot ausnahmsweise mal nicht von Jerrynicki", "wen du furzt aber notfal psirt :3oest:", "alter ich finde den toMATenmark nicht", "Oh nein habZAHn padra feckel rumter geschmisen", "Sonic sagt: du bsit ein fetter hurensohn halt maul", "Bevor es zu spät ist | Minecraft Kurzfilm", "Coole frau", "Wa", "Hello", "Scheise!!!!!", "www.boris-becker", "Wohin ist satellit abgestuerzt ???", "!!!JETZT bin ich ein NAZI!!!!!", "!!!könnte mir gefallen + schmecken ! ! !", "Gutes Gesicht, magst du Tiere?", "http://www.youtube.com/watch?", "Hello ...ich bin drin !!!"]
	var cgame = games[Math.floor(Math.random()*games.length)];
	console.log(`Ändere Bot-Status zu "${cgame}".`);
	client.user.setActivity(cgame);
	setTimeout(cycleActivity, 3600000);
};
client.login(process.env.TOKEN);
client.on("ready", () => {
	// console.log(client);
	// console.log(``);
	console.log(`Erfolgreich eingeloggt als ${client.user.username} (ID: ${client.user.id}).`);
	request({
		url: "https://api.github.com/repos/TheLastZombie/ich_iel/git/refs/heads/master",
		headers: {
			"User-Agent": "TheLastZombie/ich_iel"
		}
	}, function(error, response, body) {
		commitId = JSON.parse(body).object.url.substr(JSON.parse(body).object.url.lastIndexOf("/") + 1, 7);
		client.user.setActivity(`v2.0 Pre-Beta | ${client.guilds.size}G, ${client.channels.size}C, ${client.users.size}U | Commit ${commitId} | ${process.env.PREFIX}help`);
	});
	// cycleActivity();
	request("https://snippets.glot.io/snippets/" + process.env.GLOT_ID, function (error, response, body) {
		if (error) {
			commandSuccess = false;
			console.log("Konnte Command-Counts nicht von glot.io laden. Counter startet von 0, wird nicht hochgeladen.");
		} else {
			commandSuccess = true;
			console.log("Command-Counts erfolgreich von glot.io heruntergeladen.");
			commandCounts = JSON.parse(JSON.parse(body).files[0].content);
		};
	});
});
client.on("message", async message => {
	if (message.isMentioned(client.user)) {
	    message.channel.send("WESSEN NEGER PINGIERTE");
	};
	if (message.author.bot || message.content.indexOf(process.env.PREFIX) !== 0) {
		return;
	};
	console.log(`Neue Command-Nachricht von ${message.author.username} (ID: ${message.author.id}).`);
	if (talkedRecently.has(message.author.id)) {
		console.log(`Nachricht von ${client.user.username} (ID: ${client.user.id}) wurde wegen Rate-Limit geblockt (noch ${((talkedTimestamp[message.author.id] - Date.now()) / 1000)} Sekunden).`);
		message.channel.send("Halt die verdammte " + message.author.username + " für " + ((talkedTimestamp[message.author.id] - Date.now()) / 1000) + " Sekunden");
	} else {
		var args = message.content.slice(process.env.PREFIX.length).trim().split(/ /g);
		var command = args.shift().toLowerCase();
		if (command == "links") {
			command = "about";
		};
		if (command == "🅱") {
			command = "b";
		};
		if (command == "englisch") {
			command = "english";
		};
		if (command == "replace") {
			command = "ersatz";
		};
		if (command == "toll") {
			command = "ficken";
		};
		if (command == "wie") {
			command = "huso";
		};
		if (command == "someone") {
			command = "jemand";
		};
		if (command == "dudes") {
			command = "kerle";
		};
		if (command == "clap") {
			command = "klatsch";
		};
		if (command == "mock") {
			command = "spott";
		};
		if (command == "about" || command == "archiv" || command == "ascii" || command == "avatar" || command == "azsh" || command == "b" || command == "commands" || command == "deutsch" || command == "english" || command == "ersatz" || command == "eval" || command == "farbe" || command == "ficken" || command == "frauen" || command == "hab" || command == "help" || command == "hilfe" || command == "huso" || command == "ibims" || command == "ichmach" || command == "jemand" || command == "kerle" || command == "klatsch" || command == "name" || command == "nick" || command == "pfosten" || command == "ping" || command == "sag" || command == "spott" || command == "status" || command == "text" || command == "dreizehn" || command == "wenndu" || command == "zalgo") {
			if (command in commandCounts) {
				commandCounts[command]++;
			} else {
				commandCounts[command] = 1;
			};
			if (commandSuccess) {
				request({
					url: "https://snippets.glot.io/snippets/" + process.env.GLOT_ID,
					method: "PUT",
					headers: {
						"Authorization": "Token " + process.env.GLOT_TK
					},
					json: {
						"files": [{"name": "commands.json", "content": JSON.stringify(commandCounts)}]
					}
				}, function (error, response, body) {
					if (error) {
						console.log("Konnte Command-Counts nicht auf glot.io hochladen.");
					} else {
						console.log("Command-Counts erfolgreich auf glot.io hochgeladen.");
					};
				});
			} else {
				console.log("Commands konnten beim Starten nicht geladen werden, werden nicht hochgeladen.");
			};
			if (message.author.id != 175877241517899776) {
				talkedRecently.add(message.author.id);
				talkedTimestamp[message.author.id] = Date.now() + 5000;
				setTimeout(() => {
					talkedRecently.delete(message.author.id);
					delete talkedTimestamp[message.author.id];
				}, 5000);
			};
			console.log(`Nachricht wird als ${process.env.PREFIX}${command}-Command verarbeitet.`);
		};
		if (command === "about" || command === "links") {
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
							name: "Discord",
							value: "https://discord.gg/VmPbt3B",
							inline: true
						},
						{
							name: "GitHub",
							value: "https://github.com/TheLastZombie/ich_iel",
							inline: true
						},
						{
							name: "Invite",
							value: "https://discordapp.com/api/oauth2/authorize?client_id=405408491969314826&permissions=85056&scope=bot",
							inline: true
						}
					],
					footer: {
						icon_url: client.user.avatarURL,
						text: `v2.0 Pre-Beta | ${client.guilds.size}G, ${client.channels.size}C, ${client.users.size}U | Commit ${commitId} | by @roesch#0611 using discord.js`
					}
				}
			});
		};
		if (command === "archiv") {
			if (args && args != "") {
				var archive1 = false;
				var archive2 = false;
				var archive3 = false;
				request("http://archive.org/wayback/available?url=" + args.join(" "), function (error, response, body) {
					if (JSON.parse(body).archived_snapshots.closest) {
						archive1 = JSON.parse(body).archived_snapshots.closest.url;
					};
					request("http://archive.is/newest/" + args.join(" "), function (error, response, body) {
						if (response.statusCode == 200) {
							archive2 = response.request.href;
						};
						request("http://webcache.googleusercontent.com/search?q=cache:" + args.join(" "), function (error, response, body) {
							if (response.statusCode == 200) {
								archive3 = response.request.href;
							};
							message.channel.send({
								embed: {
									author: {
										name: "Archivsuche: " + args.join(" "),
										icon_url: client.user.avatarURL
									},
									url: "https://rsch.neocities.org",
									fields: [
										{
											name: "Wayback Machine",
											value: ((archive1) ? "✅ " + archive1 : "❎ Unavailable")
										},
										{
											name: "archive.is",
											value: ((archive2) ? "✅ " + archive2 : "❎ Unavailable")
										},
										{
											name: "Google Web Cache",
											value: ((archive3) ? "✅ " + archive3 : "❎ Unavailable")
										}
									]
								}
							});
						});
					});
				});
			} else {
				message.react("❎");
			};
		};
		if (command === "ascii") {
			if (/\[.+\] \[.+\]/.test(args.join(" "))) {
				figlet.text(args.join(" ").match(/\] \[.+\]/).toString().slice(3, -1), {
					font: args.join(" ").match(/\[.+\] \[/).toString().slice(1, -3)
				}, function(err, temp) {
					if (err) {
						figlet.fonts(function(err, temp) {
							message.channel.send(`Fehler: Schrift wurde nicht gefunden.\n\nAnwendung: \`${process.env.PREFIX}${command} [Schrift] [Nachricht]\`\nBeispiel: \`${process.env.PREFIX}${command} [Ghost] [Hallo, Welt!]\`\n\nFür eine Liste der verfügbaren Schriften siehe https://github.com/patorjk/figlet.js/tree/master/fonts.`);
						});
						return;
					};
					message.channel.send("```" + temp + "```");
				});
			};
		};
		if (command === "avatar") {
			if (message.attachments.first()) {
				console.log("Ändere Avatar zu " + message.attachments.first().url + ".");
				client.user.setAvatar(message.attachments.first().url).then(function() {
					message.react("✅");
				}).catch(function() {
					message.react("❎");
				});
			} else if (args && args != "") {
				console.log("Ändere Avatar zu " + args.join(" ") + ".");
				client.user.setAvatar(args.join(" ")).then(function() {
					message.react("✅");
				}).catch(function() {
					message.react("❎");	
				});
			} else {
				message.react("❎");
			};
		};
		if (command === "azsh") {
			if (args && args != "") {
				if (args.join(" ").match(/www\.amazon\.\w*/) && args.join(" ").match(/[A-Z0-9]{10}/)) {
					message.channel.send("https://" + args.join(" ").match(/www\.amazon\.\w*/) + "/dp/" + args.join(" ").match(/[A-Z0-9]{10}/));
				} else {
					message.react("❎");
				};
			} else {
				message.channel.fetchMessages({
					limit: 2
				}).then(temp => {
					if (temp.last().content.match(/www\.amazon\.\w*/) && temp.last().content.match(/[A-Z0-9]{10}/)) {
						message.channel.send("https://" + temp.last().content.match(/www\.amazon\.\w*/) + "/dp/" + temp.last().content.match(/[A-Z0-9]{10}/));
					} else {
						message.react("❎");
					};
				});
			};
		};
		if (command === "b" || command === "🅱") {
			var temp;
			if (args && args != "") {
				temp = args;
				for (var index = 0; index < temp.length; index++) {
					if (["B", "C", "D", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "V", "W", "X", "Z"].includes(temp[index].charAt(0).toUpperCase())) {
						temp[index] = temp[index].replace(temp[index].charAt(0), "🅱");
					} else {
						temp[index] = "🅱" + temp[index];
					};
				};
				temp = temp.join(" ").replace(/B/gi, "🅱");
				message.channel.send(temp);
			} else {
				message.channel.fetchMessages({
					limit: 2
				}).then(tmsg => {
					temp = tmsg.last().content.split(" ");
					for (var index = 0; index < temp.length; index++) {
						if (["B", "C", "D", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "V", "W", "X", "Z"].includes(temp[index].charAt(0).toUpperCase())) {
							temp[index] = temp[index].replace(temp[index].charAt(0), "🅱");
						} else {
							temp[index] = "🅱" + temp[index];
						};
					};
					temp = temp.join(" ").replace(/B/gi, "🅱");
					message.channel.send(temp);
				});
			};
		};
		if (command === "commands") {
			var commandSort = [];
			for (var commandCurr in commandCounts) {
				commandSort.push([commandCurr, commandCounts[commandCurr]]);
			};
			commandSort.sort(function(a, b) {
				return a[1] - b[1];
			});
			var temp = "**Command-Counter**\n\n";
			for (var indx in commandSort.reverse()) {
				var commandSTmp = commandSort[indx].toString().split(",");
				temp += "`" + commandSTmp[0] + "` " + commandSTmp[1] + "\n";
			};
			message.channel.send(temp);
		};
		if (command === "deutsch") {
			if (args && args != "") {
				translate(args.join(" "), {
					to: "de"
				}).then(temp => {
					message.channel.send("**" + message.author.tag + ": **" + temp.text);
				}).catch(err => {
					message.channel.send("```" + err + "```");
				});
			} else {
				message.channel.fetchMessages({
					limit: 2
				}).then(temp => {
					translate(temp.last().content, {
						to: "de"
					}).then(temp => {
						message.channel.send("**" + message.author.tag + ": **" + temp.text);
					}).catch(err => {
						message.channel.send("```" + err + "```");
					});
				});
			};
		};
		if (command === "dreizehn") {
			if (args && args != "") {
				if (is(args.join(" ")).thirteen()) {
					message.react("✅");
				} else {
					message.react("❎");
				};
			} else {
				message.channel.fetchMessages({
					limit: 2
				}).then(temp => {
					if (is(temp.last().content).thirteen()) {
						message.react("✅");
					} else {
						message.react("❎");
					};
				});
			};
		};
		if (command === "english" || command === "englisch") {
			if (args && args != "") {
				translate(args.join(" "), {
					to: "en"
				}).then(temp => {
					message.channel.send("**" + message.author.tag + ": **" + temp.text);
				}).catch(err => {
					message.channel.send("```" + err + "```");
				});
			} else {
				message.channel.fetchMessages({
					limit: 2
				}).then(temp => {
					translate(temp.last().content, {
						to: "en"
					}).then(temp => {
						message.channel.send("**" + message.author.tag + ": **" + temp.text);
					}).catch(err => {
						message.channel.send("```" + err + "```");
					});
				});
			};
		};
		if (command === "ersatz" || command === "replace") {
			if (args && args != "") {
				message.channel.send("**" + message.author.tag + ": **" + args.join(" ").replace(/aus/gi, "<:1aus:403611412938620929>").replace(/gel/gi, "<:2gel:403611412586430474>").replace(/öst/gi, "<:3oest:403611413022638081>").replace(/err/gi, "<:2err:406902951064371211>").replace(/eich/gi, "<:3eich:406902925764460544>").replace(/nuss/gi, "<:NUSS:402536220074180609>").replace(/schwul/gi, "<:schwul:406965196687671297>").replace(/verbessern/gi, "<:verbessern:403900299514740746>").replace(/xd/gi, "<:Xd:424962963095552000>").replace(/perfekt/gi, "<:perfekt:408736206885748736>").replace(/notiz beachten/gi, "<:notizbeachten:402532937221931008>").replace(/null/gi, "<:null:400375286451142656>").replace(/lösc dies/gi, "<:loesc_dies:406958134771580938>").replace(/fick geh zurück/gi, "<:fickgehzurueck:403900299087183872>").replace(/nein/gi, "<:NEIN:440132961338392590>"));
			} else {
				message.channel.fetchMessages({
					limit: 2
				}).then(temp => {
					message.channel.send("**" + message.author.tag + ": **" + temp.last().content.replace(/aus/gi, "<:1aus:403611412938620929>").replace(/gel/gi, "<:2gel:403611412586430474>").replace(/öst/gi, "<:3oest:403611413022638081>").replace(/err/gi, "<:2err:406902951064371211>").replace(/eich/gi, "<:3eich:406902925764460544>").replace(/nuss/gi, "<:NUSS:402536220074180609>").replace(/schwul/gi, "<:schwul:406965196687671297>").replace(/verbessern/gi, "<:verbessern:403900299514740746>").replace(/xd/gi, "<:Xd:424962963095552000>").replace(/perfekt/gi, "<:perfekt:408736206885748736>").replace(/notiz beachten/gi, "<:notizbeachten:402532937221931008>").replace(/null/gi, "<:null:400375286451142656>").replace(/lösc dies/gi, "<:loesc_dies:406958134771580938>").replace(/fick geh zurück/gi, "<:fickgehzurueck:403900299087183872>").replace(/nein/gi, "<:NEIN:440132961338392590>"));
				});
			};
		};
		if (command === "eval") {
			if (message.author.id != 175877241517899776) {
				message.react("❎");
			} else {
				eval(args.join(" "));
			};
		};
		if (command === "farbe") {
			if (args && args != "") {
				var temp = tinycolor(args.join(" "));
				if (temp.isValid()) {
					message.channel.send({
						embed: {
							color: parseInt(temp.toHex(), 16),
							author: {
								name: "Farbanalyse: " + temp.toHexString().toUpperCase(),
								icon_url: client.user.avatarURL
							},
							url: "https://rsch.neocities.org",
							fields: [
								{
									name: "Werte",
									value: "Input: " + temp.getOriginalInput() + "\nRGB: " + temp.toRgbString() + "\nHEX: " + temp.toHexString().toUpperCase() + "\nHSV: " + temp.toHsvString() + "\nHSL: " + temp.toHslString() + ((temp.toName()) ? "\nName: " + temp.toName() : "")
								},
								{
									name: "Helligkeit",
									value: temp.getBrightness() + " / 255 (" + ((temp.isLight()) ? "Hell" : "Dunkel") + ", nach [W3C-Richtlinien](http://www.w3.org/TR/AERT#color-contrast).)"
								},
								{
									name: "Luminanz",
									value: temp.getLuminance() + " (Nach [W3C-Richtlinien](https://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef).)"
								}
							]
						}
					});
				} else {
					message.react("❎");
				};
			} else {
				message.react("❎");
			};
		};
		if (command === "ficken" || command === "toll") {
			if (/\[.+\] \[.+\]/.test(args.join(" "))) {
				message.channel.send(`toll\ndieses ding beim ${args.join(" ").match(/\[.+\] \[/).toString().slice(1, -3)} ab\ndieses um das ${args.join(" ").match(/\] \[.+\]/).toString().slice(3, -1)}\nFICKen`);
			} else {
				message.channel.send(`toll\ndieses ding beim kopfhörer ab\ndieses um das ohr\nFICKen`);
			};
		};
		if (command === "frauen") {
			if (args && args != "") {
				message.channel.send(`Frauen stehn auf Männer wo ${args.join(" ")}`);
			} else {
				message.channel.fetchMessages({
					limit: 2
				}).then(temp => {
					message.channel.send(`Frauen stehn auf Männer wo ${temp.last().content}`);
				});
			};
		};
		if (command === "hab") {
			if (args && args != "") {
				message.channel.send(`Hab ${args.join(" ")} gemacht in meine hose skyaa <:donken:400036407697211403>`);
			} else {
				message.channel.fetchMessages({
					limit: 2
				}).then(temp => {
					message.channel.send(`Hab ${temp.last().content} gemacht in meine hose skyaa <:donken:400036407697211403>`);
				});
			};
		};
		if (command === "help") {
			message.channel.send({
				embed: {
					author: {
						name: client.user.username,
						icon_url: client.user.avatarURL
					},
					url: "https://rsch.neocities.org",
					fields: [
						{
							name: `${process.env.PREFIX}about | ${process.env.PREFIX}links`,
							value: "Shows useful information and a few links such as an invite to the support server."
						},
						{
							name: `${process.env.PREFIX}archiv`,
							value: "Searches multiple web archives for the given URL."
						},
						{
							name: `${process.env.PREFIX}ascii`,
							value: "Generates ASCII-Art. Usage: [Font] [Message]."
						},
						{
							name: `${process.env.PREFIX}avatar`,
							value: "Similar to " + process.env.PREFIX + "name, " + process.env.PREFIX + "nick and " + process.env.PREFIX + "status. Changes the bot's avatar to the specified image."
						},
						{
							name: `${process.env.PREFIX}azsh`,
							value: "Short for Amazon Shortener. Shortens ridiculously long Amazon URLs."
						},
						{
							name: `${process.env.PREFIX}b | ${process.env.PREFIX}🅱`,
							value: "🅱"
						},
						{
							name: `${process.env.PREFIX}commands`,
							value: "Used commands are counted automatically. This command returns the result."
						},
						{
							name: `${process.env.PREFIX}deutsch`,
							value: "Translates a message from any language to German."
						},
						{
							name: `${process.env.PREFIX}dreizehn`,
							value: "Checks whether a number is equal to thirteen. People wanted this."
						},
						{
							name: `${process.env.PREFIX}english | ${process.env.PREFIX}englisch`,
							value: "Translates a message from any language to English."
						},
						{
							name: `${process.env.PREFIX}ersatz | ${process.env.PREFIX}replace`,
							value: "Replaces \"AUS\", \"GEL\", \"ÖST\", etc. with their respective emotes."
						},
						{
							name: `${process.env.PREFIX}eval`,
							value: "Runs JavaScript code. Bot owner only."
						},
						{
							name: `${process.env.PREFIX}farbe`,
							value: "Analyses a color and returns information about it."
						},
						{
							name: `${process.env.PREFIX}ficken | ${process.env.PREFIX}toll`,
							value: "Two arguments in square brackets: [kopfhörer] [ohr]. [FICKen](https://discordapp.com/channels/392678434687549440/430838493359636490/431582731239948308)"
						},
						{
							name: `${process.env.PREFIX}frauen`,
							value: "Frauen stehn auf Männer wo beim Sex die Arme kaputt"
						},
						{
							name: `${process.env.PREFIX}hab`,
							value: "[Hab kacka gemacht in meine hose skyaa 🤔](https://discordapp.com/channels/392678434687549440/392678434687549442/402965723825307668)"
						},
						{
							name: `${process.env.PREFIX}help`,
							value: "Lists available commands in English."
						},
						{
							name: `${process.env.PREFIX}hilfe`,
							value: "Lists available commands in German."
						},
						{
							name: `${process.env.PREFIX}huso | ${process.env.PREFIX}wie`,
							value: "Wie gibt's nicht, du Hurensohn? [Inspired by Ömer.](https://www.facebook.com/KFC.Deutschland/posts/1145486008814468?comment_id=1145949152101487&reply_comment_id=1145955162100886)"
						},
						{
							name: `${process.env.PREFIX}ibims`,
							value: "I bims, 1 ... I don't know why I added this command."
						},
						{
							name: `${process.env.PREFIX}ichmach`,
							value: "Ich mach Scheine, ey ey! [Inspired by Gloryholei55.](https://www.gutefrage.net/frage/wie-findet-ihr-meinen-ganster-rap-text)"
						},
						{
							name: `${process.env.PREFIX}jemand | ${process.env.PREFIX}someone`,
							value: "A replacement for Discord's April Fools' joke (@someone), selects a random user."
						},
						{
							name: `${process.env.PREFIX}kerle | ${process.env.PREFIX}dudes`,
							value: "It is Wednesday, my dudes! [Inspired by kidpix2.](https://web.archive.org/web/20161007164108/https://kidpix2.tumblr.com/post/104840641707/wednesday-meme)"
						},
						{
							name: `${process.env.PREFIX}klatsch | ${process.env.PREFIX}clap`,
							value: "Inserts the first word between all others. [Inspired by the \"Ratchet Clap\".](https://www.urbandictionary.com/define.php?term=Ratchet+Clap)"
						},
						{
							name: `${process.env.PREFIX}name`,
							value: "Similar to " + process.env.PREFIX + "avatar, " + process.env.PREFIX + "nick and " + process.env.PREFIX + "status. Changes the bot's name to the specified text. Bot owner only."
						}
					]
				}
			});
			message.channel.send({
				embed: {
					fields: [
						{
							name: `${process.env.PREFIX}nick`,
							value: "Similar to " + process.env.PREFIX + "avatar, " + process.env.PREFIX + "name and " + process.env.PREFIX + "status. Changes the bot's nick to the specified text."
						},
						{
							name: `${process.env.PREFIX}ping`,
							value: "Sends a ping and replies with its latencies."
						},
						{
							name: `${process.env.PREFIX}pfosten`,
							value: "Gets a random post from the specified subreddit."
						},
						{
							name: `${process.env.PREFIX}sag`,
							value: "[Sag moin zurück 🔫 <:uff_kaputt:402413360748036128>](https://discordapp.com/channels/392678434687549440/392678434687549442/432426867690307586)"
						},
						{
							name: `${process.env.PREFIX}spott | ${process.env.PREFIX}mock`,
							value: "Converts text to MiXeD cAsE. [Inspired by SpongeBob SquarePants.](https://www.imdb.com/title/tt2512000/)"
						},
						{
							name: `${process.env.PREFIX}status`,
							value: "Similar to " + process.env.PREFIX + "avatar, " + process.env.PREFIX + "name and " + process.env.PREFIX + "nick. Changes the bot's status/game to the specified text."
						},
						{
							name: `${process.env.PREFIX}text`,
							value: "Returns a webpage as plain text, thanks to [Browsh](https://www.brow.sh/)."
						},
						{
							name: `${process.env.PREFIX}wenndu`,
							value: "wenn du ***" + process.env.PREFIX + " W E N N D U***"
						},
						{
							name: `${process.env.PREFIX}zalgo`,
							value: "H̢̡̞̫͖̟̯̜̞̫͕̋̎͒̃̌̈́͐́ͧ̆̈̈ͭ̃̓͢Ẻ̺̘̺̥͉̪͖͔͍̹̙̱̤̦̭̅̇ͤ̍͊̽̃ͩ̔̒͗̐̔ͯͤ̌́͟͟ ̶̙̝̼̩̳̘͚̜̥̝̙͙̗͇̋ͬ̔̌͊̾͞C̴̷ͥ͗͛̀̃́ͥͦ̀ͮ̏͏̸͍̣̻̝̜̘͉̘͕͚͍̬̘̤͕̖͕ͅO̢̧̲̜̼͔̪̰̹͔͖̺̮̯̫͍̖̥̲̮ͧ̍̂̀̐ͭ͊̃̓͑̒̆̎̆̾ͪͧ̀ͅM̵͍͔͈͍̹̭̠̘͍͖̺̪̳̟͉̗͕̃ͯ͌́̑͋̔ͣ̊̏ͮ̅́ͮ͠È͚̘̦̺̲̗̻̥̬̻̫̖̯̹̜̬̞̯̀̇͋̾̂͛̈ͥ̔͂̈́ͤ̈̔͡ͅS̵̡̡͉̯̣̗̬̗͓̖̪̯̹̟͍̠̥͙̝̯̐̈́͑ͪ̽͑ͥ̊̊̂͋͌ͣ̍́̃́.̵̨̨̜̱̺̫̬͍̞̩̦̙̈́ͥ͗ͭ̾͗̾̑̏̿̓̂̓̆͆̈̚͞ͅͅ"
						}
					],
					footer: {
						icon_url: client.user.avatarURL,
						text: `v2.0 Pre-Beta | ${client.guilds.size}G, ${client.channels.size}C, ${client.users.size}U | Commit ${commitId} | by @roesch#0611 using discord.js`
					}
				}
			});
		};
		if (command === "hilfe") {
			message.channel.send({
				embed: {
					author: {
						name: client.user.username,
						icon_url: client.user.avatarURL
					},
					url: "https://rsch.neocities.org",
					fields: [
						{
							name: `${process.env.PREFIX}about | ${process.env.PREFIX}links`,
							value: "Zeigt Informationen über den Bot und ein paar Links an."
						},
						{
							name: `${process.env.PREFIX}archiv`,
							value: "Durchsucht mehrere Web-Archive nach der angegebenen URL."
						},
						{
							name: `${process.env.PREFIX}ascii`,
							value: "Generiert ASCII-Art. Anwendung: [Schrift] [Nachricht]."
						},
						{
							name: `${process.env.PREFIX}avatar`,
							value: "Ähnlich wie " + process.env.PREFIX + "name, " + process.env.PREFIX + "nick und " + process.env.PREFIX + "status. Ändert den Avatar vom Bot zu dem angegebenen Bild."
						},
						{
							name: `${process.env.PREFIX}azsh`,
							value: "Kurz für Amazon Shortener, kürzt dieser Command Amazon-Links."
						},
						{
							name: `${process.env.PREFIX}b | ${process.env.PREFIX}🅱`,
							value: "🅱"
						},
						{
							name: `${process.env.PREFIX}commands`,
							value: "Ausgeführte Commands werden automatisch gezählt, dieser Command gibt die Statistiken wieder."
						},
						{
							name: `${process.env.PREFIX}deutsch`,
							value: "Übersetzt eine Nachricht ins Deutsche – mal mehr, mal weniger gut."
						},
						{
							name: `${process.env.PREFIX}dreizehn`,
							value: "Überprüft, ob eine Nummer 13 ist. Weil ihr das so wolltet."
						},
						{
							name: `${process.env.PREFIX}english | ${process.env.PREFIX}englisch`,
							value: "Übersetzt eine Nachricht ins Englische – mal mehr, mal weniger gut."
						},
						{
							name: `${process.env.PREFIX}ersatz | ${process.env.PREFIX}replace`,
							value: "Ersetzt \"AUS\", \"GEL\", \"ÖST\", etc. mit den entsprechenden Emotes."
						},
						{
							name: `${process.env.PREFIX}eval`,
							value: "Führt JS-Code aus. Nur vom Bot-Owner verwendbar."
						},
						{
							name: `${process.env.PREFIX}farbe`,
							value: "Antwortet mit Informationen über die gewählte Farbe."
						},
						{
							name: `${process.env.PREFIX}ficken | ${process.env.PREFIX}toll`,
							value: "Zwei Argumente in eckigen Klammern: [kopfhörer] [ohr]. [FICKen](https://discordapp.com/channels/392678434687549440/430838493359636490/431582731239948308)"
						},
						{
							name: `${process.env.PREFIX}frauen`,
							value: "Frauen stehn auf Männer wo beim Sex die Arme kaputt"
						},
						{
							name: `${process.env.PREFIX}hab`,
							value: "[Hab kacka gemacht in meine hose skyaa 🤔](https://discordapp.com/channels/392678434687549440/392678434687549442/402965723825307668)"
						},
						{
							name: `${process.env.PREFIX}help`,
							value: "Listet alle Commands auf Englisch auf."
						},
						{
							name: `${process.env.PREFIX}hilfe`,
							value: "Listet alle Commands auf Deutsch auf."
						},
						{
							name: `${process.env.PREFIX}huso | ${process.env.PREFIX}wie`,
							value: "Wie gibt's nicht, du Hurensohn? [Inspiriert von Ömer.](https://www.facebook.com/KFC.Deutschland/posts/1145486008814468?comment_id=1145949152101487&reply_comment_id=1145955162100886)"
						},
						{
							name: `${process.env.PREFIX}ibims`,
							value: "I bims, 1 ... Der wohl sinnloseste Command dieses Roboters."
						},
						{
							name: `${process.env.PREFIX}ichmach`,
							value: "Ich mach Scheine, ey ey! [Inspiriert von Gloryholei55.](https://www.gutefrage.net/frage/wie-findet-ihr-meinen-ganster-rap-text)"
						},
						{
							name: `${process.env.PREFIX}jemand | ${process.env.PREFIX}someone`,
							value: "Ersetzt Discord's Aprilscherz 2018 (@someone) und erwähnt einen zufälligen User."
						},
						{
							name: `${process.env.PREFIX}kerle | ${process.env.PREFIX}dudes`,
							value: "Es ist Mittwoch, meine Kerle! [Inspiriert von kidpix2.](https://web.archive.org/web/20161007164108/https://kidpix2.tumblr.com/post/104840641707/wednesday-meme)"
						},
						{
							name: `${process.env.PREFIX}klatsch | ${process.env.PREFIX}clap`,
							value: "Fügt das erste Wort zwischen alle anderen ein. [Inspiriert vom \"Ratchet Clap\".](https://www.urbandictionary.com/define.php?term=Ratchet+Clap)"
						},
						{
							name: `${process.env.PREFIX}name`,
							value: "Ähnlich wie " + process.env.PREFIX + "avatar, " + process.env.PREFIX + "nick und " + process.env.PREFIX + "status. Ändert den Namen vom Bot zu dem angegebenen Text (global). Nur vom Bot-Owner verwendbar."
						}
					]
				}
			});
			message.channel.send({
				embed: {
					fields: [
						{
							name: `${process.env.PREFIX}nick`,
							value: "Ähnlich wie " + process.env.PREFIX + "avatar, " + process.env.PREFIX + "name und " + process.env.PREFIX + "status. Ändert den Nickname vom Bot zu dem angegebenen Text."
						},
						{
							name: `${process.env.PREFIX}ping`,
							value: "Pingt den Roboter an und antwortet mit den Latenzzeiten."
						},
						{
							name: `${process.env.PREFIX}pfosten`,
							value: "Antwortet mit einem zufälligen Post aus dem spezifizierten Subreddit."
						},
						{
							name: `${process.env.PREFIX}sag`,
							value: "[Sag moin zurück 🔫 <:uff_kaputt:402413360748036128>](https://discordapp.com/channels/392678434687549440/392678434687549442/432426867690307586)"
						},
						{
							name: `${process.env.PREFIX}spott | ${process.env.PREFIX}mock`,
							value: "Gibt die Nachricht abwechselnd in Groß- und Kleinbuchstaben wieder. [Inspiriert von SpongeBob Schwammkopf.](https://www.imdb.com/title/tt2512000/)"
						},
						{
							name: `${process.env.PREFIX}status`,
							value: "Ähnlich wie " + process.env.PREFIX + "avatar, " + process.env.PREFIX + "name und " + process.env.PREFIX + "nick. Ändert den Status vom Bot zu dem angegebenen Text."
						},
						{
							name: `${process.env.PREFIX}text`,
							value: "Gibt eine Webseite mit Hilfe von [Browsh](https://www.brow.sh/) als reinen Text wieder."
						},
						{
							name: `${process.env.PREFIX}wenndu`,
							value: "wenn du ***" + process.env.PREFIX + " W E N N D U***"
						},
						{
							name: `${process.env.PREFIX}zalgo`,
							value: "E̢̟̥̤̻̥̗͕̘̯̮͕̩̫̯ͫ̉̃̒̈́͢͝ͅȐ̟̞̫̦̭̼͈̺̝̾̅ͦͬ̏ͧͫ̄̿̀ ̴̹̩͖͚̭͓͛͛͑̈͛́͊͌̏̋ͫ̀̀̚͟K̶̨̡̛̜̥̻̬̩̟̬͇ͩ̈̂͛̎͛̾͒͝Ȍ̷̪̠͇͕̪̰̼̜̬̺̮̒̍̎͂͊͞M̸̷̛̉ͧ͆̂̈̈́̽̽͢͏̲̦͖͍̟̮͕͖̲̩͇̘̝M̸̶̪̗̲̘̖̗̹̟̦͎̳̜̥̮̲͗̈ͥ̋ͫͨ̋̈́͂ͭͥ̋̐̑ͤ̚͟͟ͅT̴̨̥̜̠̼̮͊̿̿ͧͩ̾ͨ͊ͦͥ͗̽ͤ͐̾ͫͣ̚͜͞.̓͊̈́̎ͫ̈́̊͊́̉͐͑͘҉̙̬̟͉"
						}
					],
					footer: {
						icon_url: client.user.avatarURL,
						text: `v2.0 Pre-Beta | ${client.guilds.size}G, ${client.channels.size}C, ${client.users.size}U | Commit ${commitId} | von @roesch#0611 mit discord.js`
					}
				}
			});
		};
		if (command === "huso" || command === "wie") {
			if (args && args != "") {
				message.channel.send(`Wie ${args.join(" ")}, du Hurensohn?`);
			} else {
				message.channel.fetchMessages({
					limit: 2
				}).then(temp => {
					message.channel.send(`Wie ${temp.last().content}, du Hurensohn?`);
				});
			};
		};
		if (command === "ibims") {
			if (args && args != "") {
				message.channel.send(`I bims, 1 ${args.join(" ")}!`);
			} else {
				if (message.guild.members.get(message.author.id).nickname) {
					message.channel.send(`I bims, 1 ${message.guild.members.get(message.author.id).nickname}!`);
				} else {
					message.channel.send(`I bims, 1 ${message.author.username}!`);
				};
			};
		};
		if (command === "ichmach") {
			if (args && args != "") {
				var temp = args.join(" ");
			} else {
				var temp = "Scheine";
			};
			message.channel.send(`Bitte Objektiv beurteilen hab jetzt lange dafür gebraucht Stellt euch den Beat vor die Hook ist mit AutoTune\n\ney ey ich mach ${temp} ey ey ich mach ${temp} ey ey ich mach ${temp} ey ey ich mach ${temp} ey ey ich mach ${temp} ey ey ich mach ${temp} Ich rappe und mache Krieg wie '39 und bin beim Dealen fleißig Ich hatte mit vielen Frauen Sex und saufe Wodka Bull auf Ex ey ey ich mach ${temp} ey ey ich mach ${temp} ey ey ich mach ${temp} ey ey ich mach ${temp} ey ey ich mach ${temp} ey ey ich mach ${temp} Wer mich fikt den fike ich zurück Eyyyy Brudi mach nicht so auf 31er den ich komm in Haus und mach Schaden mit Waffe yooooohhhooo Wallah ich schiesse mit 5 kancken auf dein Haus ey ey ich mach ${temp} ey ey ich mach ${temp} ey ey ich mach ${temp} ey ey ich mach ${temp} ey ey ich mach ${temp} ey ey ich mach ${temp} Ich mache mit Koks Para und fike und Porsche Pana Ich nehm Drogen ala MDMA HEROIN COCAIN DOPE CRYSTAL und rauche denn Stoff gib mir den J und deine Mutter gibt mir Shoot So habe ich euch gefikkt yea yea Cho`);
		};
		if (command === "jemand" || command === "someone") {
			var temp = message.channel.guild.members.random().user;
			if (message.guild.members.get(temp.id).nickname) {
				message.channel.send(cool() + " " + message.guild.members.get(temp.id).nickname + " " + args.join(" "));
			} else {
				message.channel.send(cool() + " " + temp.username + " " + args.join(" "));
			};
		};
		if (command === "kerle" || command === "dudes") {
			if (args && args != "") {
				message.channel.send(`Es ist ${args.join(" ")}, meine Kerle!`);
			} else {
				var temp = new Date();
				message.channel.send(`Es ist ${["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"][temp.getDay()]}, meine Kerle!`);
			};
		};
		if (command === "klatsch" || command === "clap") {
			if (args.length > 1) {
				var temp = args[0];
				args.shift();
				args = args.filter(Boolean);
				message.channel.send(args.join(` ${temp} `));
			} else if (args.length == 1) {
				message.channel.fetchMessages({
					limit: 2
				}).then(temp => {
					message.channel.send(temp.last().content.split(/ /g).join(` ${args} `));
				});
			};
		};
		if (command === "name") {
			if (message.author.id != 175877241517899776) {
				message.react("❎");
			} else {
				if (args && args != "") {
					console.log(`Ändere Bot-Name zu "${args.join(" ")}".`);
					client.user.setUsername(args.join(" "));
				} else {
					message.channel.fetchMessages({
						limit: 2
					}).then(temp => {
						console.log(`Ändere Bot-Name zu "${temp.last().content}".`);
						client.user.setUsername(temp.last().content);
					});
				};
				message.react("✅");
			};
		};
		if (command === "nick") {
			if (args && args != "") {
				console.log(`Ändere Bot-Nick zu "${args.join(" ")}".`);
				message.guild.members.get(client.user.id).setNickname(args.join(" "));
			} else {
				message.channel.fetchMessages({
					limit: 2
				}).then(temp => {
					console.log(`Ändere Bot-Nick zu "${temp.last().content}".`);
					message.guild.members.get(client.user.id).setNickname(temp.last().content);
				});
			};
			message.react("✅");
		};
		if (command === "pfosten") {
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
											"name": "Autor",
											"value": JSON.parse(body)[0]["data"]["children"][0]["data"]["author"],
											"inline": true
										},
										{
											"name": "Datum",
											"value": new Date(JSON.parse(body)[0]["data"]["children"][0]["data"]["created"] * 1000).toISOString().replace(/T/, " ").replace(/\..+/, ""),
											"inline": true
										},
										{
											"name": "Votes",
											"value": "▲ " + JSON.parse(body)[0]["data"]["children"][0]["data"]["ups"] + " | " + JSON.parse(body)[0]["data"]["children"][0]["data"]["downs"] + " ▼",
											"inline": true
										},
										{
											"name": "Aktivität",
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
		};
		if (command === "ping") {
			var temp = await message.channel.send("Ping...");
			temp.edit(`Pong! Latenz: ${temp.createdTimestamp - message.createdTimestamp} ms. API-Latenz: ${Math.round(client.ping)} ms.`);
		};
		if (command === "sag") {
			if (args && args != "") {
				message.channel.send(`Sag ${args.join(" ")} zurück 🔫 <:uff_kaputt:402413360748036128>`);
			} else {
				message.channel.fetchMessages({
					limit: 2
				}).then(temp => {
					message.channel.send(`Sag ${temp.last().content} zurück 🔫 <:uff_kaputt:402413360748036128>`);
				});
			};
		};
		if (command === "spott" || command === "mock") {
			if (args && args != "") {
				var temp = args.join(" ").split("");
				for (indx = 0; indx < temp.length; indx++) {
					if (indx % 2 == false) {
						temp[indx] = temp[indx].toUpperCase();
					} else {
						temp[indx] = temp[indx].toLowerCase();
					};
				};
				temp = temp.join("");
				message.channel.send(temp);
			} else {
				message.channel.fetchMessages({
					limit: 2
				}).then(temp => {
					var temp = temp.last().content.split("");
					for (indx = 0; indx < temp.length; indx++) {
						if (indx % 2 == false) {
							temp[indx] = temp[indx].toUpperCase();
						} else {
							temp[indx] = temp[indx].toLowerCase();
						};
					};
					temp = temp.join("");
					message.channel.send(temp);
				});
			};
		};
		if (command === "status") {
			if (args && args != "") {
				console.log(`Ändere Bot-Status zu "${args.join(" ")}".`);
				client.user.setActivity(args.join(" "));
			} else {
				message.channel.fetchMessages({
					limit: 2
				}).then(temp => {
					console.log(`Ändere Bot-Status zu "${temp.last().content}".`);
					client.user.setActivity(temp.last().content);
				});
			};
			message.react("✅");
		};
		if (command === "text") {
			if (args && args != "") {
				request({
					url: "https://text.brow.sh/" + args.join(" "),
					method: "GET",
					rejectUnauthorized: false
				}, function (error, response, body) {
					request({
						url: "https://snippets.glot.io/snippets",
						method: "POST",
						json: {
							"files": [{"content": body}]
						}
					}, function (error, response, body) {
						message.channel.send("https://glot.io/snippets/" + body.id + "/raw");
					});
				});
			} else {
				message.react("❎");
			};
		};
		if (command === "wenndu") {
			if (args && args != "") {
				message.channel.send("wenn du ***" + args.join(" ").split("").join(" ").toUpperCase() + " " + args.join(" ").split("")[args.join(" ").split("").length - 1].toUpperCase() + "***");
			} else {
				message.channel.send("geht nich du huso");
			};
		};
		if (command === "zalgo") {
			if (args && args != "") {
				message.channel.send(zalgo(args.join(" ")));
			} else {
				message.channel.fetchMessages({
					limit: 2
				}).then(temp => {
					message.channel.send(zalgo(temp.last().content));
				});
			};
		};
	};
});
