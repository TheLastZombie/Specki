if (args && args != '') {
  message.channel.send(zalgo(args.join(' ')))
} else {
  message.channel.fetchMessages({
    limit: 2
  }).then(temp => {
    message.channel.send(zalgo(temp.last().content))
  })
};
