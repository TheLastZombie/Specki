const discord = require("discord.js");
const translate = require("google-translate-api");
const cool = require("cool-ascii-faces");
const request = require("request");
const figlet = require("figlet");
const zalgo = require("to-zalgo");

const commandList = ["ascii", "avatar", "b", "commands", "deutsch", "english", "ersatz", "ficken", "frauen", "hab", "hilfe", "huso", "ibims", "ichmach", "jemand", "kerle", "klatsch", "name", "nick", "pfosten", "ping", "sag", "spott", "status", "wenndu", "zalgo", "dreizehn"];
const alias = ["ascii", "avatar", "🅱", "commands", "deutsch", "englisch", "replace", "toll", "frauen", "hab", "help", "wie", "ibims", "ichmach", "someone", "dudes", "clap", "name", "nick", "pfosten", "ping", "sag", "mock", "status", "wenndu", "zalgo", "dreizehn"];

const admin_id = "175877241517899776"; //roesch
//const admin_id = "142953170396643328"; //mikee

const client = new discord.Client({
	autoReconnect: true
});
const talkedRecently = new Set();
let talkedTimestamp = {};
let commandCounts = {};
function cycleActivity(){
	var games = ["Jerrynicki hat den großen Schwul", "/r/anti_iel > /r/ich_iel", "----- unt schw -----", "Ein Bot ausnahmsweise mal nicht von Jerrynicki", "wen du furzt aber notfal psirt :3oest:", "alter ich finde den toMATenmark nicht", "Oh nein habZAHn padra feckel rumter geschmisen", "Sonic sagt: du bsit ein fetter hurensohn halt maul", "Bevor es zu spät ist | Minecraft Kurzfilm", "Coole frau", "Wa", "Hello", "Scheise!!!!!", "www.boris-becker", "Wohin ist satellit abgestuerzt ???", "!!!JETZT bin ich ein NAZI!!!!!", "!!!könnte mir gefallen + schmecken ! ! !", "Gutes Gesicht, magst du Tiere?", "http://www.youtube.com/watch?", "Hello ...ich bin drin !!!"]
	var cgame = games[Math.floor(Math.random()*games.length)];
	console.log(`Ändere Bot-Status zu "${cgame}".`);
	client.user.setActivity(cgame);
	setTimeout(cycleActivity, 3600000);
}
client.login(process.env.TOKEN);
client.on("ready", () => {
	console.log(`Erfolgreich eingeloggt als ${client.user.username} (ID: ${client.user.id}).`);
	request({
		url: "https://api.github.com/repos/TheLastZombie/ich_iel/git/refs/heads/master",
		headers: {
			"User-Agent": "TheLastZombie/ich_iel"
		}
	}, function(error, response, body) {
		client.user.setActivity(`v2.0 Pre-Beta | Commit ${JSON.parse(body).object.url.substr(JSON.parse(body).object.url.lastIndexOf("/") + 1, 7)} | ${process.env.PREFIX}hilfe`);
	});
	request("https://snippets.glot.io/snippets/" + process.env.GLOT_ID, function (error, response, body) {
		if (error) {
			console.log("Konnte Command-Counts nicht von glot.io laden. Counter startet von 0.");
		} else {
			console.log("Command-Counts erfolgreich von glot.io heruntergeladen.");
			commandCounts = JSON.parse(JSON.parse(body).files[0].content);
		};
	});
});
client.on("message", async message => {
	let args = message.content.slice(process.env.PREFIX.length).trim().split(/ /g);
	let command = args.shift().toLowerCase();
	let content = args.join(" ");
	let safeUsername = message.author.username.replace("@", "");

	if (message.author.bot || message.content.indexOf(process.env.PREFIX) !== 0) {
		return;
	};
	console.log(`Neue Command-Nachricht von ${safeUsername} (ID: ${message.author.id}).`);
	if (talkedRecently.has(message.author.id)) {
		console.log(`Nachricht von ${client.user.username} (ID: ${client.user.id}) wurde wegen Rate-Limit geblockt (noch ${((talkedTimestamp[message.author.id] - Date.now()) / 1000)} Sekunden).`);
		message.channel.send("Halt die verdammte " +  + " für " + ((talkedTimestamp[message.author.id] - Date.now()) / 1000) + " Sekunden");
		return;
	}


	if(commandList.indexOf(command) == -1 && alias.indexOf(command) >= 0){
		temp = alias.indexOf(command);
		command = commandList[temp];
		console.log("Replaced " + alias[temp] + " with " + command);
	}
	
	if (command in commandList) {
		if (command in commandCounts) {
			commandCounts[command]++;
		} else {
			commandCounts[command] = 1;
		};
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
		if (message.author.id != admin_id) {
			talkedRecently.add(message.author.id);
			talkedTimestamp[message.author.id] = Date.now() + 5000;
			setTimeout(() => {
				talkedRecently.delete(message.author.id);
				delete talkedTimestamp[message.author.id];
			}, 5000);
		};
		console.log(`Nachricht wird als ${process.env.PREFIX}${command}-Command verarbeitet.`);
	};
	switch(command){
		case "ascii":
			if (/\[.+\] \[.+\]/.test(content)) {
				figlet.text(content.match(/\] \[.+\]/).toString().slice(3, -1), {
					font: content.match(/\[.+\] \[/).toString().slice(1, -3)
				}, function(err, temp) {
					if (err) {
						figlet.fonts(function(err, temp) {
							message.channel.send(`Fehler: Schrift wurde nicht gefunden.\n\nAnwendung: \`${process.env.PREFIX}${command} [Schrift] [Nachricht]\`\nBeispiel: \`${process.env.PREFIX}${command} [Ghost] [Hallo, Welt!]\`\n\nFür eine Liste der verfügbaren Schriften siehe https://github.com/patorjk/figlet.js/tree/master/fonts.`);
						});
						return;
					};
					message.channel.send("```" + temp + "```");
				});
			}
			break;
		case "avatar":
			if (message.attachments.first()) {
				console.log("Ändere Avatar zu " + message.attachments.first().url + ".");
				message.react("✅");
				client.user.setAvatar(message.attachments.first().url).catch(function(error) {
					message.react("❎");
				});
			} else if (args && args != "") {
				console.log("Ändere Avatar zu " + content + ".");
				message.react("✅");
				client.user.setAvatar(content).catch(function(error) {
					message.react("❎");	
				});
			} else {
				message.react("❎");
			}
			break;
		case "b":
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
			break;
		case "commands":
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
			break;
		case "deutsch":
			if (args && args != "") {
				translate(content, {
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
			break;
		case "englisch":
			if (args && args != "") {
				translate(content, {
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
			break;
		case "ersatz":
			if (args && args != "") {
				message.channel.send("**" + message.author.tag + ": **" + content.replace(/aus/gi, "<:1aus:403611412938620929>").replace(/gel/gi, "<:2gel:403611412586430474>").replace(/öst/gi, "<:3oest:403611413022638081>").replace(/err/gi, "<:2err:406902951064371211>").replace(/eich/gi, "<:3eich:406902925764460544>").replace(/nuss/gi, "<:NUSS:402536220074180609>").replace(/schwul/gi, "<:schwul:406965196687671297>").replace(/verbessern/gi, "<:verbessern:403900299514740746>").replace(/xd/gi, "<:Xd:424962963095552000>").replace(/perfekt/gi, "<:perfekt:408736206885748736>").replace(/notiz beachten/gi, "<:notizbeachten:402532937221931008>").replace(/null/gi, "<:null:400375286451142656>").replace(/lösc dies/gi, "<:loesc_dies:406958134771580938>").replace(/fick geh zurück/gi, "<:fickgehzurueck:403900299087183872>").replace(/nein/gi, "<:NEIN:440132961338392590>"));
			} else {
				message.channel.fetchMessages({
					limit: 2
				}).then(temp => {
					message.channel.send("**" + message.author.tag + ": **" + temp.last().content.replace(/aus/gi, "<:1aus:403611412938620929>").replace(/gel/gi, "<:2gel:403611412586430474>").replace(/öst/gi, "<:3oest:403611413022638081>").replace(/err/gi, "<:2err:406902951064371211>").replace(/eich/gi, "<:3eich:406902925764460544>").replace(/nuss/gi, "<:NUSS:402536220074180609>").replace(/schwul/gi, "<:schwul:406965196687671297>").replace(/verbessern/gi, "<:verbessern:403900299514740746>").replace(/xd/gi, "<:Xd:424962963095552000>").replace(/perfekt/gi, "<:perfekt:408736206885748736>").replace(/notiz beachten/gi, "<:notizbeachten:402532937221931008>").replace(/null/gi, "<:null:400375286451142656>").replace(/lösc dies/gi, "<:loesc_dies:406958134771580938>").replace(/fick geh zurück/gi, "<:fickgehzurueck:403900299087183872>").replace(/nein/gi, "<:NEIN:440132961338392590>"));
				});
			};
			break;
		case "ficken":
			if (/\[.+\] \[.+\]/.test(content)) {
				message.channel.send(`toll\ndieses ding ${content.match(/\[.+\] \[/).toString().slice(1, -3)} ab\ndieses ${content.match(/\] \[.+\]/).toString().slice(3, -1)}\nFICKen`);
			} else {
				message.channel.send(`toll\ndieses ding beim kopfhörer ab\ndieses um das ohr\nFICKen`);
			};
			break;
		case "frauen":
			if (args && args != "") {
				message.channel.send(`Frauen stehn auf Männer wo ${content}`);
			} else {
				message.channel.fetchMessages({
					limit: 2
				}).then(temp => {
					message.channel.send(`Frauen stehn auf Männer wo ${temp.last().content}`);
				});
			};
			break;
		case "hab":
			if (args && args != "") {
				message.channel.send(`Hab ${content} gemacht in meine hose skyaa <:donken:400036407697211403>`);
			} else {
				message.channel.fetchMessages({
					limit: 2
				}).then(temp => {
					message.channel.send(`Hab ${temp.last().content} gemacht in meine hose skyaa <:donken:400036407697211403>`);
				});
			};
			break;
		case "hilfe":
			message.channel.send({
				embed: {
					author: {
						name: client.user.username,
						icon_url: client.user.avatarURL
					},
					url: "https://rsch.neocities.org",
					description: "Der Roboter exklusiv für den /r/ich_iel Discord. Hier gibt's eine Übersicht über alle Commands.\nFür die meisten Commands gilt: Ist kein Text angegeben, wird die vorherige Nachricht verwendet.",
					fields: [
						{
							name: `${process.env.PREFIX}ascii`,
							value: "Generiert ASCII-Art. Anwendung: [Schrift] [Nachricht]."
						},
						{
							name: `${process.env.PREFIX}avatar`,
							value: "Ähnlich wie " + process.env.PREFIX + "name, " + process.env.PREFIX + "nick und " + process.env.PREFIX + "status. Ändert den Avatar vom Bot zu dem angegebenen Bild."
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
							name: `${process.env.PREFIX}english | ${process.env.PREFIX}englisch`,
							value: "Übersetzt eine Nachricht ins Englische – mal mehr, mal weniger gut."
						},
						{
							name: `${process.env.PREFIX}ersatz | ${process.env.PREFIX}replace`,
							value: "Ersetzt \"AUS\", \"GEL\", \"ÖST\", etc. mit den entsprechenden Emotes."
						},
						{
							name: `${process.env.PREFIX}ficken | ${process.env.PREFIX}toll`,
							value: "Zwei Argumente in eckigen Klammern: [beim kopfhörer] [um das ohr]. [FICKen](https://discordapp.com/channels/392678434687549440/430838493359636490/431582731239948308)"
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
							name: `${process.env.PREFIX}hilfe | ${process.env.PREFIX}help`,
							value: "Wenn du das hier lesen kannst, weißt du bereits, was dieser Command macht."
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
							value: "Ähnlich wie " + process.env.PREFIX + "avatar, " + process.env.PREFIX + "nick und " + process.env.PREFIX + "status. Ändert den Namen vom Bot zu dem angegebenen Text (global)."
						},
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
							name: `${process.env.PREFIX}wenndu`,
							value: "wenn du ***" + process.env.PREFIX + " W E N N D U***"
						},
						{
							name: `${process.env.PREFIX}zalgo`,
							value: "Er kommt und so halt, gell?"
						},
						{
							name: `${process.env.PREFIX}dreizehn [Zahl]`,
							value: "Überprüfe ob eine Zahl 13 ist..."
						}
					],
					footer: {
						icon_url: client.user.avatarURL,
						text: "v2.0 Pre-Beta | von @roesch#0611 mit discord.js"
					}
				}
			});
			break;
		case "huso":
			if (args && args != "") {
				message.channel.send(`Wie ${content}, du Hurensohn?`);
			} else {
				message.channel.fetchMessages({
					limit: 2
				}).then(temp => {
					message.channel.send(`Wie ${temp.last().content}, du Hurensohn?`);
				});
			};
			break;
		case "ibims":
			if (args && args != "") {
				message.channel.send(`I bims, 1 ${content}!`);
			} else {
				if (message.guild.members.get(message.author.id).nickname) {
					message.channel.send(`I bims, 1 ${message.guild.members.get(message.author.id).nickname}!`);
				} else {
					message.channel.send(`I bims, 1 ${safeUsername}!`);
				};
			};
			break;
		case "ichmach":
			if (args && args != "") {
				var temp = content;
			} else {
				var temp = "Scheine";
			};
			message.channel.send(`Bitte Objektiv beurteilen hab jetzt lange dafür gebraucht Stellt euch den Beat vor die Hook ist mit AutoTune\n\ney ey ich mach ${temp} ey ey ich mach ${temp} ey ey ich mach ${temp} ey ey ich mach ${temp} ey ey ich mach ${temp} ey ey ich mach ${temp} Ich rappe und mache Krieg wie '39 und bin beim Dealen fleißig Ich hatte mit vielen Frauen Sex und saufe Wodka Bull auf Ex ey ey ich mach ${temp} ey ey ich mach ${temp} ey ey ich mach ${temp} ey ey ich mach ${temp} ey ey ich mach ${temp} ey ey ich mach ${temp} Wer mich fikt den fike ich zurück Eyyyy Brudi mach nicht so auf 31er den ich komm in Haus und mach Schaden mit Waffe yooooohhhooo Wallah ich schiesse mit 5 kancken auf dein Haus ey ey ich mach ${temp} ey ey ich mach ${temp} ey ey ich mach ${temp} ey ey ich mach ${temp} ey ey ich mach ${temp} ey ey ich mach ${temp} Ich mache mit Koks Para und fike und Porsche Pana Ich nehm Drogen ala MDMA HEROIN COCAIN DOPE CRYSTAL und rauche denn Stoff gib mir den J und deine Mutter gibt mir Shoot So habe ich euch gefikkt yea yea Cho`);
			break;
		case "jemand":
			var temp = message.channel.guild.members.random().user;
			if (message.guild.members.get(temp.id).nickname) {
				message.channel.send(cool() + " " + message.guild.members.get(temp.id).nickname + " " + content);
			} else {
				message.channel.send(cool() + " " + temp.username + " " + content);
			};
			break;
		case "kerle":
			if (args && args != "") {
				message.channel.send(`Es ist ${content}, meine Kerle!`);
			} else {
				var temp = new Date();
				message.channel.send(`Es ist ${["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"][temp.getDay()]}, meine Kerle!`);
			};
			break;
		case "klatsch":
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
			break;
		case "name":
			if(message.author.id === admin_id){
				if (args && args != "") {
					console.log(`Ändere Bot-Name zu "${content}".`);
					client.user.setUsername(content);
				} else {
					message.channel.fetchMessages({
						limit: 2
					}).then(temp => {
						console.log(`Ändere Bot-Name zu "${temp.last().content}".`);
						client.user.setUsername(temp.last().content);
					});
				}
				message.react("✅");
			}else{
				message.channel.send("$name darf nur vom Bot-Administrator verwendet werden!");
				message.react("❌");
			}
			break;
		case "nick":
			if (args && args != "") {
				console.log(`Ändere Bot-Nick zu "${content}".`);
				message.guild.members.get(client.user.id).setNickname(content);
			} else {
				message.channel.fetchMessages({
					limit: 2
				}).then(temp => {
					console.log(`Ändere Bot-Nick zu "${temp.last().content}".`);
					message.guild.members.get(client.user.id).setNickname(temp.last().content);
				});
			}
			message.react("✅");
			break;
		case "pfosten":
			if (args && args != "") {
				request("https://www.reddit.com/r/" + content + "/random/.json", function (error, response, body) {
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
				});
			}
			break;
		case "ping":
			var temp = await message.channel.send("Ping...");
			temp.edit(`Pong! Latenz: ${temp.createdTimestamp - message.createdTimestamp} ms. API-Latenz: ${Math.round(client.ping)} ms.`);
			break;
		case "sag":
			if (args && args != "") {
				message.channel.send(`Sag ${content} zurück 🔫 <:uff_kaputt:402413360748036128>`);
			} else {
				message.channel.fetchMessages({
					limit: 2
				}).then(temp => {
					message.channel.send(`Sag ${temp.last().content} zurück 🔫 <:uff_kaputt:402413360748036128>`);
				});
			}
			break;
		case "spott":
			if (args && args != "") {
				var temp = content.split("");
				for (indx = 0; indx < temp.length; indx++) {
					if (indx % 2 == false) {
						temp[indx] = temp[indx].toUpperCase();
					} else {
						temp[indx] = temp[indx].toLowerCase();
					}
				}
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
						}
					}
					temp = temp.join("");
					message.channel.send(temp);
				});
			}
			break;
		case "status":
			if (args && args != "") {
				console.log(`Ändere Bot-Status zu "${content}".`);
				client.user.setActivity(content);
			} else {
				message.channel.fetchMessages({
					limit: 2
				}).then(temp => {
					console.log(`Ändere Bot-Status zu "${temp.last().content}".`);
					client.user.setActivity(temp.last().content);
				});
			}
			message.react("✅");
			break;
		case "wenndu":
			if (args && args != "") {
				message.channel.send("wenn du ***" + content.split("").join(" ").toUpperCase() + " " + content.split("")[content.split("").length - 1].toUpperCase() + "***");
			} else {
				message.channel.send("geht nich du huso");
			}
			break;
		case "zalgo":
			if (args && args != "") {
				message.channel.send(zalgo(content));
			} else {
				message.channel.fetchMessages({
					limit: 2
				}).then(temp => {
					message.channel.send(zalgo(temp.last().content));
				});
			}
			break;
		case "dreizehn":
			if(parseInt(args[0]) == 13){
				message.channel.send("Ja, " + safeUsername + ", 13 ist 13.");
			}else if(isNaN(parseInt(args[0]))){
				message.channel.send("Nein nur Zahlen die 13 sind können die Zahl dreizehn sein.");
			}else{
				message.channel.send("Nein, " + safeUsername + ", \""+parseInt(args[0])+"\" ist nicht 13.");
			}
			break;
		default:
			console.log("Invalid command by " + message.author.id + " command: " + command);
	}
})