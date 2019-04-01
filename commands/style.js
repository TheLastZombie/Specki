var mode = args.shift();
var temp = {};
request("http://qaz.wtf/u/convert.cgi?text=" + (args.join(" ") || "Enter your text!"), function(error, response, body) {
    var $ = cheerio.load(body);
    $("tr").each(function() {
        temp[$(this).find("td:nth-child(1)").text().toLowerCase().replace(/\s/g, "-")] = $(this).find("td:nth-child(2)").text().trim();
    });
    message.channel.send(temp[mode] || "**" + mode + "** is not a valid style! Supported are: **" + Object.keys(temp).join("**, **") + "**.");
});
