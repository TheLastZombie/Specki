const discord = require("discord.js");
const gtranslate = require("google-translate-api");
const cool = require("cool-ascii-faces");
const request = require("request");
const figlet = require("figlet");
const zalgo = require("to-zalgo");
const tinycolor = require("tinycolor2");
const is = require("is-thirteen");
const jimp = require("jimp");
const fs = require("fs");
const {VM} = require("vm2");
const {table} = require("table");
const breakdance = require("breakdance");
const ytranslate = require("yandex-translate")(process.env.YNDX_TK);
const client = new discord.Client({
	autoReconnect: true,
	disableEveryone: true
});
var rllist = new Set();
var rltime = {};
var cmdcnt = {};
var cmdscc;
var commid;
var isplay = false;
client.login(process.env.TOKEN);
client.on("ready", () => {
	console.log("Erfolgreich eingeloggt als " + client.user.username + " (ID: " + client.user.id + ").");
	request({
		url: "https://api.github.com/repos/TheLastZombie/ich_iel/git/refs/heads/master",
		headers: {
			"User-Agent": "TheLastZombie/ich_iel"
		}
	}, function(error, response, body) {
		commid = JSON.parse(body).object.url.substr(JSON.parse(body).object.url.lastIndexOf("/") + 1, 7);
	});
	request("https://snippets.glot.io/snippets/" + process.env.GLOT_ID, function (error, response, body) {
		if (error) {
			cmdscc = false;
			console.log("Konnte Command-Counts und Status nicht von glot.io laden. Counter startet von 0, wird nicht hochgeladen.");
		} else {
			cmdscc = true;
			console.log("Command-Counts und Status erfolgreich von glot.io heruntergeladen.");
			cmdcnt = JSON.parse(JSON.parse(body).files[0].content);
			console.log("Ändere Bot-Status zu \"" + JSON.parse(body).files[1].content + "\".");
			client.user.setActivity(JSON.parse(body).files[1].content);
		};
	});
});
client.on("message", async message => {
	if (message.author.bot || message.content.indexOf(process.env.PREFIX) !== 0) {
		return;
	};
	console.log("Neue Command-Nachricht von " + message.author.username + " (ID: " + message.author.id + ").");
	if (rllist.has(message.author.id)) {
		console.log("Nachricht von " + client.user.username + " (ID: " + client.user.id + ") wurde wegen Rate-Limit geblockt (noch " + ((rltime[message.author.id] - Date.now()) / 1000) + " Sekunden).");
		message.channel.send("Halt die verdammte " + message.author.username + " für " + ((rltime[message.author.id] - Date.now()) / 1000) + " Sekunden");
	} else {
		var args = message.content.slice(process.env.PREFIX.length).trim().split(/ /g);
		var command = args.shift().toLowerCase();
		if (command == "4") {
			command = "4chan";
		};
		if (command == "links" || command == "invite") {
			command = "about";
		};
		if (command == "🅱") {
			command = "b";
		};
		if (command == "de") {
			command = "deutsch";
		};
		if (command == "englisch" || command == "en") {
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
		if (command == "4chan" || command == "about" || command == "archiv" || command == "ascii" || command == "avatar" || command == "azsh" || command == "b" || command == "commands" || command == "decrypt" || command == "deutsch" || command == "dreizehn" || command == "eh" || command == "encrypt" || command == "english" || command == "ersatz" || command == "eval" || command == "farbe" || command == "ficken" || command == "flag" || command == "frauen" || command == "hab" || command == "help" || command == "hilfe" || command == "huso" || command == "ibims" || command == "ichmach" || command == "jemand" || command == "kerle" || command == "klatsch" || command == "mc" || command == "movie" || command == "name" || command == "nick" || command == "pat" || command == "pfosten" || command == "ping" || command == "play" || command == "rms" || command == "sag" || command == "sankaku" || command == "spott" || command == "status" || command == "text" || command == "unicode" || command == "wenndu" || command == "zalgo") {
			if (command in cmdcnt) {
				cmdcnt[command]++;
			} else {
				cmdcnt[command] = 1;
			};
			if (cmdscc) {
				request({
					url: "https://snippets.glot.io/snippets/" + process.env.GLOT_ID,
					method: "PUT",
					headers: {
						"Authorization": "Token " + process.env.GLOT_TK
					},
					json: {
						"files": [{"name": "commands.json", "content": JSON.stringify(cmdcnt)}, {"name": "status.txt", "content": client.user.presence.game.name}]
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
				rllist.add(message.author.id);
				rltime[message.author.id] = Date.now() + 2500;
				setTimeout(() => {
					rllist.delete(message.author.id);
					delete rltime[message.author.id];
				}, 2500);
			};
			console.log("Nachricht wird als " + process.env.PREFIX + command + "-Command verarbeitet.");
		};
		if (command === "4chan" || command === "4") {
			var temp;
			request("https://a.4cdn.org/boards.json", function (error, response, body) {
				if (JSON.parse(body).boards.some(temp => temp.board == args.join(" "))) {
					board = args.join(" ");
				} else {
					board = JSON.parse(body).boards[Math.floor(Math.random() * JSON.parse(body).boards.length)].board;
				};
				request("https://a.4cdn.org/" + board + "/catalog.json", function (error, response, body) {
					temp = JSON.parse(body)[Math.floor(Math.random() * JSON.parse(body).length)].threads;
					temp = temp[Math.floor(Math.random() * temp.length)];
					message.channel.send({
						embed: {
							title: (temp.sub ? temp.sub : "/" + board + "/ – Thread #" + temp.no),
							description: breakdance(temp.com),
							url: "https://boards.4chan.org/" + board + "/thread/" + temp.no,
							timestamp: new Date(temp.tim).toISOString(),
							author: {
								"name": temp.name
							},
							thumbnail: {
								url: "https://i.4cdn.org/" + board + "/" + temp.tim + temp.ext
							},
							footer: {
								text: temp.replies + " replies, " + temp.images + " images"
							}
						}
					});
				});
			});
		};
		if (command === "about" || command === "links" || command === "invite") {
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
							name: "Wiki",
							value: "https://github.com/TheLastZombie/ich_iel/wiki",
							inline: true
						},
						{
							name: "Invite (Neccessary)",
							value: "https://discordapp.com/oauth2/authorize?client_id=405408491969314826&permissions=70372416&scope=bot",
							inline: true
						},
						{
							name: "Invite (Future-Proof)",
							value: "https://discordapp.com/oauth2/authorize?client_id=405408491969314826&permissions=8&scope=bot",
							inline: true
						}
					],
					footer: {
						icon_url: client.user.avatarURL,
						text: "v2.0 Pre-Beta | " + client.guilds.size + "G, " + client.channels.size + "C, " + client.users.size + "U | Commit " + commid + " | by @roesch#0611 using discord.js"
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
							message.channel.send("Fehler: Schrift wurde nicht gefunden.\n\nAnwendung: `" + process.env.PREFIX + command + " [Schrift] [Nachricht]`\nBeispiel: `${process.env.PREFIX}${command} [Ghost] [Hallo, Welt!]`\n\nFür eine Liste der verfügbaren Schriften siehe https://github.com/patorjk/figlet.js/tree/master/fonts.");
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
			for (var commandCurr in cmdcnt) {
				commandSort.push([commandCurr, cmdcnt[commandCurr]]);
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
		if (command === "decrypt" || command === "encrypt") {
			var temp = args.shift();
			if (command == "decrypt") {
				if (temp == "base64") {
					message.channel.send(Buffer.from(args.join(" "), "base64").toString("utf8"));
				} else if (temp == "hex") {
					message.channel.send(Buffer.from(args.join(" "), "hex").toString("utf8"));
				} else if (temp == "binary") {
					var temp = args.join(" ").replace(/\s/g,"").match(/.{8}/g);
					var outp = "";
					for (var i = 0; i < temp.length; i++) {
						outp += String.fromCharCode(parseInt(temp[i], 2));
					};
					message.channel.send(outp);
				} else if (temp == "uri") {
					message.channel.send(decodeURI(args.join(" ")));
				} else if (temp == "rot13") {
					var temp = args.join(" ");
					var outp = "";
					for (var i = 0; i < temp.length; i++) {
						var tmpp = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".charAt("NOPQRSTUVWXYZABCDEFGHIJKLMnopqrstuvwxyzabcdefghijklm".indexOf(temp.charAt(i)));
						if (tmpp) {
							outp += tmpp;
						} else {
							outp += temp.charAt(i);
						};
					};
					message.channel.send(outp);
				} else if (temp == "atbash") {
					var temp = args.join(" ");
					var outp = "";
					for (var i = 0; i < temp.length; i++) {
						var tmpp = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".charAt("ZYXWVUTSRQPONMLKJIHGFEDCBAzyxwvutsrqponmlkjihgfedcba".indexOf(temp.charAt(i)));
						if (tmpp) {
							outp += tmpp;
						} else {
							outp += temp.charAt(i);
						};
					};
					message.channel.send(outp);
				} else {
					message.channel.send("**" + temp + "** is not a valid encoding! Supported are: **base64**, **hex**, **binary**, **uri**, **rot13** and **atbash**.");
				};
			};
			if (command === "encrypt") {
				if (temp == "base64") {
					message.channel.send(Buffer.from(args.join(" "), "utf8").toString("base64"));
				} else if (temp == "hex") {
					message.channel.send(Buffer.from(args.join(" "), "utf8").toString("hex"));
				} else if (temp == "binary") {
					var temp = args.join(" ");
					var outp = "";
					for (var i = 0; i < temp.length; i++) {
						outp += ("00000000" + temp[i].charCodeAt(0).toString(2)).slice(-8) + " ";
					};
					message.channel.send(outp);
				} else if (temp == "uri") {
					message.channel.send(encodeURI(args.join(" ")));
				} else if (temp == "rot13") {
					var temp = args.join(" ");
					var outp = "";
					for (var i = 0; i < temp.length; i++) {
						var tmpp = "NOPQRSTUVWXYZABCDEFGHIJKLMnopqrstuvwxyzabcdefghijklm".charAt("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".indexOf(temp.charAt(i)));
						if (tmpp) {
							outp += tmpp;
						} else {
							outp += temp.charAt(i);
						};
					};
					message.channel.send(outp);
				} else if (temp == "atbash") {
					var temp = args.join(" ");
					var outp = "";
					for (var i = 0; i < temp.length; i++) {
						var tmpp = "ZYXWVUTSRQPONMLKJIHGFEDCBAzyxwvutsrqponmlkjihgfedcba".charAt("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".indexOf(temp.charAt(i)));
						if (tmpp) {
							outp += tmpp;
						} else {
							outp += temp.charAt(i);
						};
					};
					message.channel.send(outp);
				} else {
					message.channel.send("**" + temp + "** is not a valid encoding! Supported are: **base64**, **hex**, **binary**, **uri**, **rot13** and **atbash**.");
				};
			};
		};
		if (command === "deutsch" || command === "de") {
			if (args && args != "") {
				ytranslate.translate(args.join(" "), {
					to: "de"
				}, function(err, res) {
					if (err) {
						message.channel.send("```" + String(err) + "```");
						return;
					};
					message.channel.send("**" + message.author.tag + ": **" + res.text);
				});
			} else {
				message.channel.fetchMessages({
					limit: 2
				}).then(temp => {
					ytranslate.translate(temp.last().content, {
						to: "de"
					}, function(err, res) {
						if (err) {
							message.channel.send("```" + String(err) + "```");
							return;
						};
						message.channel.send("**" + message.author.tag + ": **" + res.text);
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
		if (command === "eh") {
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
		};
		if (command === "english" || command === "englisch" || command === "en") {
			if (args && args != "") {
				ytranslate.translate(args.join(" "), {
					to: "en"
				}, function(err, res) {
					if (err) {
						message.channel.send("```" + String(err) + "```");
						return;
					};
					message.channel.send("**" + message.author.tag + ": **" + res.text);
				});
			} else {
				message.channel.fetchMessages({
					limit: 2
				}).then(temp => {
					ytranslate.translate(temp.last().content, {
						to: "en"
					}, function(err, res) {
						if (err) {
							message.channel.send("```" + String(err) + "```");
							return;
						};
						message.channel.send("**" + message.author.tag + ": **" + res.text);
					});
				});
			};
		};
		if (command === "ersatz" || command === "replace") {
			if (args && args != "") {
				message.channel.send("**" + message.author.tag + ": **" + args.join(" ").replace(/aus/gi, "<:1aus:403611412938620929>").replace(/gel/gi, "<:2gel:403611412586430474>").replace(/öst/gi, "<:3oest:403611413022638081>").replace(/err/gi, "<:2err:406902951064371211>").replace(/eich/gi, "<:3eich:406902925764460544>").replace(/nuss/gi, "<:NUSS:402536220074180609>").replace(/schwul/gi, "<:schwul:406965196687671297>").replace(/verbessern/gi, "<:verbessern:403900299514740746>").replace(/xd/gi, "<:Xd:424962963095552000>").replace(/perfekt/gi, "<:perfekt:408736206885748736>").replace(/notiz beachten/gi, "<:notizbeachten:402532937221931008>").replace(/null/gi, "<:null:400375286451142656>").replace(/lösc dies/gi, "<:loesc_dies:406958134771580938>").replace(/fick geh zurück/gi, "<:fickgehzurueck:403900299087183872>").replace(/nein/gi, "<:NEIN:440132961338392590>").replace(/oel/gi,"<:oel:455346482866946049>").replace(/öl/gi,"<:oel:455346482866946049>"));
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
				var vmlog = "";
				try {
					vmout = new VM({
						sandbox: {
							console: {
								log: function(str) {
									vmlog += JSON.stringify(str) + "\n";
								}
							}
						}
					}).run(args.join(" "));
					var vmmsg = ((vmout != undefined) ? "Output: \n```" + JSON.stringify(vmout) + "```\n\n" : "") + ((vmlog != "") ? "Console: \n```" + vmlog + "```" : "");
					if (vmmsg) {
						message.channel.send(vmmsg);
					} else {
						message.channel.send("Nothing returned! ¯\\_(ツ)_/¯");
					};
				} catch(err) {
					message.channel.send("Error: \n```" + err.toString() + "```");
				};
			} else {
				try {
					var evout = eval("(" + args.join(" ") + ")");
					if (evout) {
						message.channel.send("Output: \n```" + JSON.stringify(evout) + "```\n\nNote: Code is not running in a sandbox and thus console output not accessible.");
					};
				} catch(err) {
					message.channel.send("Error: \n```" + err.toString() + "```");
				};
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
				message.channel.send("toll\ndieses ding beim " + args.join(" ").match(/\[.+\] \[/).toString().slice(1, -3) + " ab\ndieses um das " + args.join(" ").match(/\] \[.+\]/).toString().slice(3, -1) + "\nFICKen");
			} else {
				message.channel.send("toll\ndieses ding beim kopfhörer ab\ndieses um das ohr\nFICKen");
			};
		};
		if (command === "flag") {
			if (message.attachments.first()) {
				jimp.read(message.attachments.first().url, (error, temp) => {
					jimp.read(__dirname + "/images/flag.png", (error, flag) => {
						flag.resize(temp.bitmap.width, temp.bitmap.height, jimp.RESIZE_NEAREST_NEIGHBOR).opacity(0.5);
						temp.composite(flag, 0, 0).write(__dirname + "/images/temp.png", function() {
							message.channel.send({
								files: [{
									attachment: __dirname + "/images/temp.png",
									name: "flag.png"
								}]
							});
						});
					});
				});
			} else if (args && args != "") {
				jimp.read(args.join(" "), (error, temp) => {
					jimp.read(__dirname + "/images/flag.png", (error, flag) => {
						flag.resize(temp.bitmap.width, temp.bitmap.height, jimp.RESIZE_NEAREST_NEIGHBOR).opacity(0.5);
						temp.composite(flag, 0, 0).write(__dirname + "/images/temp.png", function() {
							message.channel.send({
								files: [{
									attachment: __dirname + "/images/temp.png",
									name: "flag.png"
								}]
							});
						});
					});
				});
			} else {
				message.react("❎");
			};
		};
		if (command === "frauen") {
			if (args && args != "") {
				message.channel.send("Frauen stehn auf Männer wo " + args.join(" "));
			} else {
				message.channel.fetchMessages({
					limit: 2
				}).then(temp => {
					message.channel.send("Frauen stehn auf Männer wo " + temp.last().content);
				});
			};
		};
		if (command === "hab") {
			if (args && args != "") {
				message.channel.send("Hab " + args.join(" ") + " gemacht in meine hose skyaa <:donken:400036407697211403>");
			} else {
				message.channel.fetchMessages({
					limit: 2
				}).then(temp => {
					message.channel.send("Hab " + temp.last().content + " gemacht in meine hose skyaa <:donken:400036407697211403>");
				});
			};
		};
		if (command === "help") {
			message.channel.send("A list of commands can be found at https://github.com/TheLastZombie/ich_iel/wiki/Commands-🇺🇸.");
		};
		if (command === "hilfe") {
			message.channel.send("Eine Liste von Commands kann unter https://github.com/TheLastZombie/ich_iel/wiki/Commands-🇩🇪 gefunden werden.");
		};
		if (command === "huso" || command === "wie") {
			if (args && args != "") {
				message.channel.send("Wie " + args.join(" ") + ", du Hurensohn?");
			} else {
				message.channel.fetchMessages({
					limit: 2
				}).then(temp => {
					message.channel.send("Wie " + temp.last().content + ", du Hurensohn?");
				});
			};
		};
		if (command === "ibims") {
			if (args && args != "") {
				message.channel.send("I bims, 1 " + args.join(" ") + "!");
			} else {
				message.channel.send("I bims, 1 " + message.member.displayName + "!");
			};
		};
		if (command === "ichmach") {
			if (args && args != "") {
				var temp = args.join(" ");
			} else {
				var temp = "Scheine";
			};
			message.channel.send("Bitte Objektiv beurteilen hab jetzt lange dafür gebraucht Stellt euch den Beat vor die Hook ist mit AutoTune\n\ney ey ich mach " + temp + " ey ey ich mach " + temp + " ey ey ich mach " + temp + " ey ey ich mach " + temp + " ey ey ich mach " + temp + " ey ey ich mach " + temp + " Ich rappe und mache Krieg wie '39 und bin beim Dealen fleißig Ich hatte mit vielen Frauen Sex und saufe Wodka Bull auf Ex ey ey ich mach " + temp + " ey ey ich mach " + temp + " ey ey ich mach " + temp + " ey ey ich mach " + temp + " ey ey ich mach " + temp + " ey ey ich mach " + temp + " Wer mich fikt den fike ich zurück Eyyyy Brudi mach nicht so auf 31er den ich komm in Haus und mach Schaden mit Waffe yooooohhhooo Wallah ich schiesse mit 5 kancken auf dein Haus ey ey ich mach " + temp + " ey ey ich mach " + temp + " ey ey ich mach " + temp + " ey ey ich mach " + temp + " ey ey ich mach " + temp + " ey ey ich mach " + temp + " Ich mache mit Koks Para und fike und Porsche Pana Ich nehm Drogen ala MDMA HEROIN COCAIN DOPE CRYSTAL und rauche denn Stoff gib mir den J und deine Mutter gibt mir Shoot So habe ich euch gefikkt yea yea Cho");
		};
		if (command === "jemand" || command === "someone") {
			message.channel.send(cool() + " " + message.guild.members.random().displayName + " " + args.join(" "));
		};
		if (command === "kerle" || command === "dudes") {
			if (args && args != "") {
				message.channel.send("Es ist " + args.join(" ") + ", meine Kerle!");
			} else {
				var temp = new Date();
				message.channel.send("Es ist " + ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"][temp.getDay()] + ", meine Kerle!");
			};
		};
		if (command === "klatsch" || command === "clap") {
			if (args.length > 1) {
				var temp = args[0];
				args.shift();
				args = args.filter(Boolean);
				message.channel.send(args.join(" " + temp + " "));
			} else if (args.length == 1) {
				message.channel.fetchMessages({
					limit: 2
				}).then(temp => {
					message.channel.send(temp.last().content.split(/ /g).join(" " + args + " "));
				});
			};
		};
		if (command === "mc") {
			if (args && args != "") {
				request("https://api.mojang.com/users/profiles/minecraft/" + args.join(" "), function (error, response, body) {
					if (error || !JSON.parse(body).id) {
						message.react("❎");
					} else {
						message.channel.send({
							embed: {
								title: "Minecraft Avatar of " + args.join(" "),
								description: "[Avatar](https://mc-heads.net/combo/" + JSON.parse(body).id + ")\n[Body + Overlay (2D)](https://visage.surgeplay.com/frontfull/" + JSON.parse(body).id + ")\n[Body + Overlay (3D 1)](https://crafatar.com/renders/body/" + JSON.parse(body).id + "?overlay)\n[Body + Overlay (3D 2)](https://visage.surgeplay.com/full/" + JSON.parse(body).id + ")\n[Body + Overlay (3D 3)](https://mc-heads.net/body/" + JSON.parse(body).id + ")\n[Body (3D)](https://crafatar.com/renders/body/" + JSON.parse(body).id + ")\n[Bust + Overlay (2D)](https://minotar.net/armor/bust/" + JSON.parse(body).id + ")\n[Bust (2D)](https://minotar.net/bust/" + JSON.parse(body).id + ")\n[Bust + Overlay (3D)](https://visage.surgeplay.com/bust/" + JSON.parse(body).id + ")\n[Cape](https://crafatar.com/capes/" + JSON.parse(body).id + ")\n[Front](https://visage.surgeplay.com/front/" + JSON.parse(body).id + ")\n[Head + Overlay (2D)](https://crafatar.com/avatars/" + JSON.parse(body).id + "?overlay)\n[Head (2D)](https://crafatar.com/avatars/" + JSON.parse(body).id + ")\n[Head + Overlay (3D 1)](https://visage.surgeplay.com/head/" + JSON.parse(body).id + ")\n[Head + Overlay (3D 2)](https://cravatar.eu/helmhead/" + JSON.parse(body).id + ")\n[Head + Overlay (3D 3)](https://crafatar.com/renders/head/" + JSON.parse(body).id + "?overlay)\n[Head + Overlay (3D 4)](https://mc-heads.net/head/" + JSON.parse(body).id + ")\n[Head (3D 1)](https://crafatar.com/renders/head/" + JSON.parse(body).id + ")\n[Head (3D 2)](https://minotar.net/cube/" + JSON.parse(body).id + ")\n[Head (3D 3)](https://cravatar.eu/head/" + JSON.parse(body).id + ")\n[Skin](https://crafatar.com/skins/" + JSON.parse(body).id + ")",
								thumbnail: {
									url: "https://crafatar.com/renders/body/" + JSON.parse(body).id + "?overlay"
								},
								footer: {
									text: "APIs provided by mc-heads.net, visage.surgeplay.com, crafatar.com, minotar.net and cravatar.eu."
								}
							}
						});
					};
				});
			} else {
				message.react("❎");
			};
		};
		if (command === "movie") {
			if (args && args != "") {
				request("https://www.omdbapi.com/?apikey=" + process.env.OMDB_TK + "&s=" + args.join(" "), function (error, response, body) {
					if (JSON.parse(body).Search) {
						request("https://www.omdbapi.com/?apikey=" + process.env.OMDB_TK + "&i=" + JSON.parse(body).Search[0].imdbID, function (error, response, body) {
							var temp = JSON.parse(body);
							message.channel.send({
								"embed": {
									"title": temp.Title + " (" + temp.Year + ")",
									"description": temp.Plot,
									"thumbnail": {
										"url": temp.Poster
									},
									"fields": [
										{
											"name": "Director",
											"value": temp.Director,
											"inline": true
										},
										{
											"name": "Release Date",
											"value": temp.Released,
											"inline": true
										},
										{
											"name": "Actors",
											"value": temp.Actors
										},
										{
											"name": "Genre",
											"value": temp.Genre,
											"inline": true
										},
										{
											"name": "Rating",
											"value": temp.Rated,
											"inline": true
										},
										{
											"name": "Runtime",
											"value": temp.Runtime,
											"inline": true
										},
										{
											"name": "Awards",
											"value": temp.Awards,
											"inline": true
										}
									]
								}
							});
						});
					} else {
						message.react("❎");
					};
				});
			} else {
				message.react("❎");
			};
		};
		if (command === "name") {
			if (message.author.id != 175877241517899776) {
				message.react("❎");
			} else {
				if (args && args != "") {
					console.log("Ändere Bot-Name zu \"" + args.join(" ") + "\".");
					client.user.setUsername(args.join(" "));
				} else {
					message.channel.fetchMessages({
						limit: 2
					}).then(temp => {
						console.log("Ändere Bot-Name zu \"" + temp.last().content + "\".");
						client.user.setUsername(temp.last().content);
					});
				};
				message.react("✅");
			};
		};
		if (command === "nick") {
			if (args && args != "") {
				console.log("Ändere Bot-Nick zu \"" + args.join(" ") + "\".");
				client.guilds.map(guild => {
					if (guild.me.hasPermission("CHANGE_NICKNAME")) {
						guild.me.setNickname(args.join(" "));
					};
				});
			} else {
				message.channel.fetchMessages({
					limit: 2
				}).then(temp => {
					console.log("Ändere Bot-Nick zu \"" + temp.last().content + "\".");
					client.guilds.map(guild => {
						if (guild.me.hasPermission("CHANGE_NICKNAME")) {
							guild.me.setNickname(temp.last().content);
						};
					});
				});
			};
			message.react("✅");
		};
		if (command === "pat") {
			request("http://headp.at/js/pats.json", function (error, response, body) {
				if (error || response.statusCode != 200) {
					message.channel.send("pats.json konnte nicht geladen werden... UwU");
				} else {
					message.channel.send({
						files: ["http://headp.at/pats/" + JSON.parse(body)[Math.floor(Math.random()*JSON.parse(body).length)]]
					});
				};
			});
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
			temp.edit("Pong! Latenz: " + (temp.createdTimestamp - message.createdTimestamp) + " ms. API-Latenz: " + Math.round(client.ping) + " ms.");
		};
		if (command === "play") {
			if (args && args != "") {
				if (isplay) {
					message.react("❎");
				} else {
					message.member.voiceChannel.join().then(connection => {
						isplay = true;
						connection.playFile(__dirname + "/sounds/" + args.join(" ") + ".mp3").on("end", () => {
							message.member.voiceChannel.leave();
							isplay = false;
						});
					}).catch(err => message.channel.send(err));
				};
			} else {
				message.channel.send("Eine Liste von Sounds kann unter https://github.com/TheLastZombie/ich_iel/wiki/Sounds-🇩🇪 gefunden werden.");
			};
		};
		if (command === "rms") {
			request("https://rms.sexy/?images", function (error, response, body) {
				if (error || response.statusCode != 200) {
					message.channel.send("?images konnte nicht geladen werden... :(");
				} else {
					message.channel.send({
						files: ["https://rms.sexy" + JSON.parse(body)[Math.floor(Math.random()*JSON.parse(body).length)]]
					});
				};
			});
		};
		if (command === "sag") {
			if (args && args != "") {
				message.channel.send("Sag " + args.join(" ") + " zurück 🔫 <:uff_kaputt:402413360748036128>");
			} else {
				message.channel.fetchMessages({
					limit: 2
				}).then(temp => {
					message.channel.send("Sag " + temp.last().content + " zurück 🔫 <:uff_kaputt:402413360748036128>");
				});
			};
		};
		if (command === "sankaku") {
			if (message.channel.nsfw == false) {
				message.react("🔞");
			} else {
				if (args && args != "") {
					request("https://capi-beta.sankakucomplex.com/post/index.json?tags=" + encodeURIComponent(args.join("+")), function (error, response, body) {
						try {
							var temp = JSON.parse(body)[Math.floor(Math.random() * JSON.parse(body).length)];
							message.channel.send({
								"embed": {
									"title": temp.title,
									"description": temp.tags.map(x => x.name).join(", "),
									"fields": [{
											"name": "Uploader",
											"value": temp.author,
											"inline": true
										},
										{
											"name": "Posted",
											"value": new Date(temp.created_at.s * 1000).toISOString().replace(/T/, " ").replace(/\..+/, ""),
											"inline": true
										},
										{
											"name": "Link",
											"value": "https://chan.sankakucomplex.com/post/show/" + temp.id,
											"inline": true
										}
									],
									"image": {
										"url": temp.preview_url
									}
								}
							});
						}
						catch(error) {
							message.channel.send(error);
						};
					});
				};
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
				console.log("Ändere Bot-Status zu \"" + args.join(" ") + "\".");
				client.user.setActivity(args.join(" "));
				request({
					url: "https://snippets.glot.io/snippets/" + process.env.GLOT_ID,
					method: "PUT",
					headers: {
						"Authorization": "Token " + process.env.GLOT_TK
					},
					json: {
						"files": [{"name": "commands.json", "content": JSON.stringify(cmdcnt)}, {"name": "status.txt", "content": args.join(" ")}]
					}
				}, function (error, response, body) {
					if (error) {
						console.log("Konnte Status nicht auf glot.io hochladen.");
					} else {
						console.log("Status erfolgreich auf glot.io hochgeladen.");
					};
				});
			} else {
				message.channel.fetchMessages({
					limit: 2
				}).then(temp => {
					console.log("Ändere Bot-Status zu \"" + temp.last().content + "\".");
					client.user.setActivity(temp.last().content);
					request({
						url: "https://snippets.glot.io/snippets/" + process.env.GLOT_ID,
						method: "PUT",
						headers: {
							"Authorization": "Token " + process.env.GLOT_TK
						},
						json: {
							"files": [{"name": "status.txt", "content": temp.last().content}]
						}
					}, function (error, response, body) {
						if (error) {
							console.log("Konnte Status nicht auf glot.io hochladen.");
						} else {
							console.log("Status erfolgreich auf glot.io hochgeladen.");
						};
					});
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
		if (command === "unicode") {
			if (args && args != "") {
				var temp = [["Character", "Code", "Name"]];
				for (i = 0; i < args.join(" ").replace(/[\x00-\x1F\x7F-\x9F]/g, "").length; i++) {
					for (j = 0; j < 29; j++) {
						var code = require("unicode/category/" + ["Cc", "Cf", "Co", "Cs", "Ll", "Lm", "Lo", "Lt", "Lu", "Mc", "Me", "Mn", "Nd", "Nl", "No", "Pc", "Pd", "Pe", "Pf", "Pi", "Po", "Ps", "Sc", "Sk", "Sm", "So", "Zl", "Zp", "Zs"][j])[args.join(" ").replace(/[\x00-\x1F\x7F-\x9F]/g, "").charCodeAt(i)];
						if (code) {
							temp[i + 1] = [args.join(" ").replace(/[\x00-\x1F\x7F-\x9F]/g, "")[i], code.value, code.name];
							break;
						};
					};
				};
				message.channel.send("```" + table(temp, {
					border: {
						topBody: `─`,
						topJoin: `┬`,
						topLeft: `┌`,
						topRight: `┐`,
						bottomBody: `─`,
						bottomJoin: `┴`,
						bottomLeft: `└`,
						bottomRight: `┘`,
						bodyLeft: `│`,
						bodyRight: `│`,
						bodyJoin: `│`,
						joinBody: `─`,
						joinLeft: `├`,
						joinRight: `┤`,
						joinJoin: `┼`
					}
				}) + "```");
			} else {
				message.react("❎");
			};
		};
		if (command === "wenndu") {
			if (args && args != "") {
				message.channel.send("wenn du ***" + args.join(" ").split("").join(" ").toUpperCase() + " " + args.join(" ").split("")[args.join(" ").split("").length - 1].toUpperCase() + "***");
			} else {
				message.react("❎");
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
//jerry schw lol
