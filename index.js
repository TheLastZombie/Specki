const discord = require("discord.js");
const cool = require("cool-ascii-faces");
const request = require("request");
const figlet = require("figlet");
const zalgo = require("to-zalgo");
const tinycolor = require("tinycolor2");
const is = require("is-thirteen");
const jimp = require("jimp");
const fs = require("fs");
const {table} = require("table");
const breakdance = require("breakdance");
const translate = require("@vitalets/google-translate-api");
const xmorse = require("xmorse");
const ascii85 = require("ascii85");
const cheerio = require("cheerio");
const nekos = require("nekos.life");
const neko = new nekos();
const fileType = require("file-type");
const Lyricist = require("lyricist");
const lyricist = new Lyricist(process.env.GENIUS_TK);
const LastFmNode = require("lastfm").LastFmNode;
const lastfm = new LastFmNode({
	api_key: process.env.FM_KEY,
	secret: process.env.FM_SECRET,
});
const Decimal = require("decimal.js");
const Fuse = require("fuse.js");
const parseString = require("xml2js").parseString;
const Minesweeper = require("discord.js-minesweeper");
const util = require("util");
const exec = require("child_process").exec;
const spawn = require("child_process").spawn;
const path = require("path");
const os = require("os");
const client = new discord.Client({
	autoReconnect: true,
	disableEveryone: true
});
var ownerIds = ["175877241517899776", "421371986824921109"];
var rllist = new Set();
var rltime = {};
var cmdcnt = {};
var cmdscc;
var commid;
var offline = false;
var modules = fs.readdirSync("./modules", {
	withFileTypes: true
}).filter(x => !x.isDirectory()).map(x => x.name);
client.login(process.env.TOKEN);
client.on("ready", () => {
	for (x in modules) require("./modules/" + modules[x]);
	console.log("Successfully logged in as " + client.user.username + " (ID: " + client.user.id + ").");
	const commidcmd = spawn("git", ["rev-parse", "--short", "HEAD"]);
	commidcmd.stdout.on("data", data => commid = data.toString().trim());
	request("https://snippets.glot.io/snippets/" + process.env.GLOT_ID, function (error, response, body) {
		if (error) {
			cmdscc = false;
			console.log("Couldn't load data from glot.io. Count will start from zero and will not be uploaded.");
		} else {
			cmdscc = true;
			console.log("Successfully loaded data from glot.io.");
			cmdcnt = JSON.parse(JSON.parse(body).files[0].content);
			console.log("Changing activity to \"" + JSON.parse(body).files[1].content + "\".");
			client.user.setActivity(JSON.parse(body).files[1].content);
		};
	});
});
client.on("message", async message => {
	if (message.author.bot || message.content.indexOf(process.env.PREFIX) !== 0 || (offline && ownerIds.includes(message.author.id) == false)) {
		return;
	};
	console.log("New command message from " + message.author.username + " (ID: " + message.author.id + ").");
	if (rllist.has(message.author.id)) {
		console.log("Message from " + message.author.username + " (ID: " + message.author.id + ") ignored because of rate limiting (" + ((rltime[message.author.id] - Date.now()) / 1000) + " seconds left).");
		message.channel.send("Halt die verdammte " + message.author.username + " für " + ((rltime[message.author.id] - Date.now()) / 1000) + " Sekunden");
	} else {
		var args = message.content.slice(process.env.PREFIX.length).trim().split(/\s/g);
		var command = args.shift().toLowerCase();
		if (command == "4") command = "4chan";
		if (command == "links" || command == "invite") command = "about";
		if (command == "|||") command = "archillect";
		if (command == "archive") command = "archiv";
		if (command == "arch") command = "aur";
		if (command == "🅱") command = "b";
		if (command == "decode") command = "decrypt";
		if (command == "de") command = "deutsch";
		if (command == "thirteen" || command == "13") command = "dreizehn";
		if (command == "e-h") command = "eh";
		if (command == "encode") command = "encrypt";
		if (command == "englisch" || command == "en") command = "english";
		if (command == "replace") command = "ersatz";
		if (command == "toll") command = "ficken";
		if (command == "ask") command = "frag";
		if (command == "servers") command = "guilds";
		if (command == "wie") command = "huso";
		if (command == "ib") command = "inspirobot";
		if (command == "someone") command = "jemand";
		if (command == "dudes") command = "kerle";
		if (command == "clap") command = "klatsch";
		if (command == "sh") command = "leo";
		if (command == "validate") command = "mail";
		if (command == "osu!") command = "osu";
		if (command == "headpat") command = "pat";
		if (command == "post" || command == "reddit") command = "pfosten";
		if (command == "fm") {
			if (args[0] == "songchart") args.shift();
			command = "songchart";
		};
		if (command == "mock") command = "spott";
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
						console.log("Couldn't upload data to glot.io.");
					} else {
						console.log("Successfully uploaded data to glot.io.");
					};
				});
			} else {
				console.log("Data could not be loaded and thus won't be uploaded.");
			};
			if (ownerIds.includes(message.author.id) == false) {
				rllist.add(message.author.id);
				rltime[message.author.id] = Date.now() + 2500;
				setTimeout(() => {
					rllist.delete(message.author.id);
					delete rltime[message.author.id];
				}, 2500);
			};
			console.log("Processing message as " + process.env.PREFIX + command + " command.");
			fs.readFile("./commands/" + command.replace(/.*\//, "") + ".js", "utf8", function (err, data) {
				message.channel.startTyping();
				try {
					eval(data);
				} catch(e) {
					request({
						url: "https://snippets.glot.io/snippets",
						method: "POST",
						json: {
							"title": "Automatic error report at " + new Date(message.createdTimestamp).toISOString(),
							"public": false,
							"files": [
								{
									"name": "Message.txt",
									"content": util.inspect(message)
								},
								{
									"name": "Error.txt",
									"content": util.inspect(e)
								}
							]
						}
					}, function (error, response, body) {
						client.fetchUser("421371986824921109").then(user => user.send("Automatic error report at " + new Date(message.createdTimestamp).toISOString() + "\nhttps://glot.io/snippets/" + body.id));
					});
					message.channel.send("Unexpected error while executing command. Automatic report has been sent to developer.```" + e.toString() + "```");
				};
				message.channel.stopTyping();
			});
		};
	};
});
