var temp = args.shift();
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
} else if (temp == "morse") {
	message.channel.send(xmorse.encode(args.join(" ")));
} else if (temp == "ascii85") {
	message.channel.send(ascii85.encode(args.join(" ")).toString());
} else {
	message.channel.send("**" + temp + "** is not a valid encoding! Supported are: **base64**, **hex**, **binary**, **uri**, **rot13**, **atbash**, **morse** and **ascii85**.");
};