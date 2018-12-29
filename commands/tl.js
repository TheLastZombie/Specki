if (message.channel.nsfw == false) {
	message.react("🔞");
} else {
	(async () => {
		var browser = await puppeteer.launch({
			ignoreHTTPSErrors: true,
			args: ['--no-sandbox', '--disable-setuid-sandbox']
		});
		var page = await browser.newPage();
		await page.goto("https://twitchlotto.com/");
		var image = await page.evaluate(() =>
			document.querySelector("img").getAttribute("src")
		);
		await browser.close();
		message.channel.send({
			files: [image]
		});
	})();
};