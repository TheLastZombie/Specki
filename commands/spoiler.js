if (/<.+>/.test(args.join(' '))) {
  message.delete().then(function () {
    let temp = args.join(' ')
    const match = temp.match(/<.+?>/g)
    const text = match.map(x => x.slice(1, -1))
    const urls = []
    upload(0)
    function upload (index) {
      if (text[index]) {
        request({
          url: 'https://snippets.glot.io/snippets',
          method: 'POST',
          json: {
            files: [{ content: text[index] }]
          }
        }, function (error, response, body) {
          urls[index] = 'https://glot.io/snippets/' + body.id + '/raw'
          upload(index + 1)
        })
      } else {
        for (let i = 0; i < match.length; i++) {
          temp = temp.replace(match[i], '[' + '█'.repeat(text[i].length) + '](' + urls[i] + " '" + text[i] + "')")
        };
        message.channel.send({
          embed: {
            author: {
              name: message.author.username,
              icon_url: message.author.avatarURL
            },
            description: temp
          }
        })
      };
    };
  })
} else {
  message.react('❎')
};
