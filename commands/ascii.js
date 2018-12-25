if (/\[.+\] \[.+\]/.test(args.join(" "))) {
	figlet.text(args.join(" ").match(/\] \[.+\]/).toString().slice(3, -1), {
		font: args.join(" ").match(/\[.+\] \[/).toString().slice(1, -3)
	}, function(err, temp) {
		if (err) {
			figlet.fonts(function(err, temp) {
				message.channel.send("Fehler: Schrift wurde nicht gefunden.\n\nAnwendung: `" + process.env.PREFIX + command + " [Schrift] [Nachricht]`\nBeispiel: `" + process.env.PREFIX + command + " [Ghost] [Hallo, Welt!]`\n\nFür eine Liste der verfügbaren Schriften siehe http://www.figlet.org/examples.html.");
			});
			return;
		};
		message.channel.send("```" + temp + "```");
	});
};
