if (args.length == 2) {
	var from = args[0];
	var to = args[1];
	var amount = args[2];
	request("https://api.exchangeratesapi.io/latest", function (error, response, body) {
		var currencies = Object.keys(JSON.parse(body).rates);
		currencies.push(JSON.parse(body).base);
		if (currencies.includes(from) && currencies.includes(to)) {
			amount = Number(amount.replace(",", "."));
			if (isNaN(amount)) {
				message.channel.send("Invalid amount supplied (was NaN)!");
			} else {
				request("https://api.exchangeratesapi.io/latest?base=" + from + "&symbols=" + to, function (error, response, body) {
					message.channel.send(amount + " " + from + " = " + Number(Decimal.mul(JSON.parse(body).rates[to], amount)) + " " + to + ".");
				});
			};
		} else {
			message.channel.send("Invalid currencies supplied! Supported are **" + currencies.join("**, **") + "**.");
		};
	});
} else {
	message.channel.send("Too many or not enough arguments supplied!\n\nUsage: `" + process.env.PREFIX + command + " [From] [To] [Amount]`\Example: `" + process.env.PREFIX + command + " USD EUR 24.99`");
};