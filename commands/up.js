if (args && args != "") {
    ping.sys.probe(args.join(" "), function (isAlive) {
        if (isAlive) {
            message.react("✅");
        } else {
            message.react("❎");
        };
    });
} else {
    message.react("❎");
};