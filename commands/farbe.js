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
				thumbnail: {
					url: "https://via.placeholder.com/512/" + temp.toHex() + "?text=+"
				},
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
