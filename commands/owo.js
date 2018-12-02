if (args && args != "") {
	message.channel.send(args.join(" ").replace(/(?:r|l)/g, "w").replace(/(?:R|L)/g, "W").replace(/n([aeiou])/g, 'ny$1').replace(/N([aeiou])/g, 'Ny$1').replace(/N([AEIOU])/g, 'Ny$1').replace(/ove/g, "uv").replace(/\!+/g, function() {
		return " " + ["(・`ω´・)", ";;w;;", "owo", "UwU", ">w<", "^w^"][Math.floor(Math.random() * 6)] + " ";
	}));
} else {
	message.channel.fetchMessages({
		limit: 2
	}).then(temp => {
		message.channel.send(temp.last().content.replace(/(?:r|l)/g, "w").replace(/(?:R|L)/g, "W").replace(/n([aeiou])/g, 'ny$1').replace(/N([aeiou])/g, 'Ny$1').replace(/N([AEIOU])/g, 'Ny$1').replace(/ove/g, "uv").replace(/\!+/g, function() {
			return " " + ["(・`ω´・)", ";;w;;", "owo", "UwU", ">w<", "^w^"][Math.floor(Math.random() * 6)] + " ";
		}));
	});
};
