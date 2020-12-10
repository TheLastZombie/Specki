if (args && args != '') {
  message.channel.send('Hab ' + args.join(' ') + ' gemacht in meine hose skyaa <:donken:400036407697211403>')
} else {
  message.channel.fetchMessages({
    limit: 2
  }).then(temp => {
    message.channel.send('Hab ' + temp.last().content + ' gemacht in meine hose skyaa <:donken:400036407697211403>')
  })
};
