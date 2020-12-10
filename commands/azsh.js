if (args && args != '') {
  if (args.join(' ').match(/www\.amazon\.\w*/) && args.join(' ').match(/[A-Z0-9]{10}/)) {
    message.channel.send('https://' + args.join(' ').match(/www\.amazon\.\w*/) + '/dp/' + args.join(' ').match(/[A-Z0-9]{10}/))
  } else {
    message.react('❎')
  };
} else {
  message.channel.fetchMessages({
    limit: 2
  }).then(temp => {
    if (temp.last().content.match(/www\.amazon\.\w*/) && temp.last().content.match(/[A-Z0-9]{10}/)) {
      message.channel.send('https://' + temp.last().content.match(/www\.amazon\.\w*/) + '/dp/' + temp.last().content.match(/[A-Z0-9]{10}/))
    } else {
      message.react('❎')
    };
  })
};
