var temp = await message.channel.send("Ping...");
temp.edit("Pong! Latenz: " + (temp.createdTimestamp - message.createdTimestamp) + " ms. API-Latenz: " + Math.round(client.ping) + " ms.");