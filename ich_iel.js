const discord = require("discord.js");
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
const googleTTS = require("google-tts-api");
const xmorse = require("xmorse");
const ascii85 = require("ascii85");
const exec = require("child_process").exec;
const path = require("path");
const client = new discord.Client({
	autoReconnect: true,
	disableEveryone: true
});
var ownerIds = ["175877241517899776"];
var rllist = new Set();
var rltime = {};
var cmdcnt = {};
var cmdscc;
var commid;
var isplay = new Set();
var offline = false;
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
	if (message.author.bot || message.content.indexOf(process.env.PREFIX) !== 0 || (offline && ownerIds.includes(message.author.id) == false)) {
		return;
	};
	console.log("Neue Command-Nachricht von " + message.author.username + " (ID: " + message.author.id + ").");
	if (rllist.has(message.author.id)) {
		console.log("Nachricht von " + client.user.username + " (ID: " + client.user.id + ") wurde wegen Rate-Limit geblockt (noch " + ((rltime[message.author.id] - Date.now()) / 1000) + " Sekunden).");
		message.channel.send("Halt die verdammte " + message.author.username + " für " + ((rltime[message.author.id] - Date.now()) / 1000) + " Sekunden");
	} else {
		var args = message.content.slice(process.env.PREFIX.length).trim().split(/\s/g);
		var command = args.shift().toLowerCase();
		if (command == "4") { command = "4chan"; };
		if (command == "links" || command == "invite") { command = "about"; };
		if (command == "arch") { command = "aur"; };
		if (command == "🅱") { command = "b"; };
		if (command == "decode") { command = "decrypt"; };
		if (command == "de") { command = "deutsch"; };
		if (command == "encode") { command = "encrypt"; };
		if (command == "englisch" || command == "en") { command = "english"; };
		if (command == "replace") { command = "ersatz"; };
		if (command == "toll") { command = "ficken"; };
		if (command == "wie") { command = "huso"; };
		if (command == "someone") { command = "jemand"; };
		if (command == "dudes") { command = "kerle"; };
		if (command == "clap") { command = "klatsch"; };
		if (command == "osu!") { command = "osu"; };
		if (command == "mock") { command = "spott"; };
		if (fs.existsSync("./commands/" + command.replace(/.*\//, "") + ".js")) {
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
			if (ownerIds.includes(message.author.id) == false) {
				rllist.add(message.author.id);
				rltime[message.author.id] = Date.now() + 2500;
				setTimeout(() => {
					rllist.delete(message.author.id);
					delete rltime[message.author.id];
				}, 2500);
			};
			console.log("Nachricht wird als " + process.env.PREFIX + command + "-Command verarbeitet.");
			fs.readFile("./commands/" + command.replace(/.*\//, "") + ".js", "utf8", function (err, data) {
				message.channel.startTyping();
				eval(data);
				message.channel.stopTyping();
			});
		};
	};
});
