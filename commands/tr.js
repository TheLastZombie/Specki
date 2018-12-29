(async () => {
	var browser = await puppeteer.launch({
		ignoreHTTPSErrors: true
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