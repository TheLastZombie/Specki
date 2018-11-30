message.channel.send("Ping...").then(function(message) {
	message.edit("Pong! Latenz: " + (Date.now() - message.createdTimestamp) + " ms. API-Latenz: " + Math.round(client.ping) + " ms.");
});
