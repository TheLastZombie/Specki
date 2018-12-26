request("http://www.petittube.com/", function (error, response, body) {
	message.channel.send("https://www.youtube.com/watch?v=" + body.match(/(youtu\.be\/|youtube\.com\/(watch\?(.*&)?v=|(embed|v)\/))([^\?&"'>]+)/)[0].slice(18));
});
