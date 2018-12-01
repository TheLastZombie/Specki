var temp = args.shift();
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
} else if (temp == "morse") {
	message.channel.send(xmorse.decode(args.join(" ")));
} else if (temp == "ascii85") {
	message.channel.send(ascii85.decode(args.join(" ")).toString());
} else {
	message.channel.send("**" + temp + "** is not a valid encoding! Supported are: **base64**, **hex**, **binary**, **uri**, **rot13**, **atbash**, **morse** and **ascii85**.");
};