message.channel.send("Pinging...").then(function(message) {
	message.edit("Pong! Latency: " + (Date.now() - message.createdTimestamp) + " ms. API latency: " + Math.round(client.ping) + " ms.");
});
