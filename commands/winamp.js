request("https://s3.amazonaws.com/webamp-uploaded-skins/", function (error, response, body) {
    parseString(body, function (err, result) {
        var temp = result.ListBucketResult.Contents.filter(x => x.Key[0].endsWith(".png"));
        message.channel.send({
            files: ["https://s3.amazonaws.com/webamp-uploaded-skins/" + temp[Math.floor(Math.random() * temp.length)].Key[0]]
        });
    });
});
