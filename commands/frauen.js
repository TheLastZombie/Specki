if (args && args != '') {
  message.channel.send('Frauen stehn auf Männer wo ' + args.join(' '))
} else {
  message.channel.fetchMessages({
    limit: 2
  }).then(temp => {
    message.channel.send('Frauen stehn auf Männer wo ' + temp.last().content)
  })
};
