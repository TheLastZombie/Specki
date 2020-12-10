if (args && args != '') {
  message.channel.send('Wie ' + args.join(' ') + ', du Hurensohn?')
} else {
  message.channel.fetchMessages({
    limit: 2
  }).then(temp => {
    message.channel.send('Wie ' + temp.last().content + ', du Hurensohn?')
  })
};
