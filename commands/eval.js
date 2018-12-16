if (ownerIds.includes(message.author.id)) {
	try {
		var evout = eval(args.join(" "));
		if (evout) {
			message.channel.send("Output: \n```" + JSON.stringify(evout) + "```\n\nNote: Code is not running in a sandbox and thus console output not accessible.");
		};
	} catch(err) {
		message.channel.send("Error: \n```" + err.toString() + "```");
	};
} else {
	var vmlog = "";
	try {
		vmout = new VM({
			timeout: 5000,
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
};
