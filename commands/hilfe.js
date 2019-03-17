fs.readdir(__dirname + "/commands/", (err, files) => {
	message.channel.send("**Verfügbare Commands:**\n" + files.map(x => path.parse(x).name).join(", ") + "\n\n**Mehr Informationen:**\n<https://github.com/TheLastZombie/Specki/wiki/Commands-🇩🇪>")
});
