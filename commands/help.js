fs.readdir(__dirname + "/commands/", (err, files) => {
	message.channel.send("**Available Commands:**\n" + files.map(x => path.parse(x).name).join(", ") + "\n\n**More Information:**\n<https://github.com/TheLastZombie/Specki/wiki/Commands-🇺🇸>")
});
