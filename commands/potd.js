request("https://www.bing.com/HPImageArchive.aspx?format=js&n=1&mkt=" + args.join(" "), function(error, response, body) {
    var temp = JSON.parse(body).images[0];
    message.channel.send({
        embed: {
            title: temp.title,
            description: temp.copyright,
            url: temp.copyrightlink,
            image: {
                url: "https://www.bing.com" + temp.url
            }
        }
    });
});