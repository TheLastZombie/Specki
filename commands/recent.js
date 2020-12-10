if (ownerIds.includes(message.author.id)) {
  if (/\[.+\] \[.+\]/.test(args.join(' '))) {
    const gld = args.join(' ').match(/\[.+\] \[/).toString().slice(1, -3)
    const chn = args.join(' ').match(/\] \[.+\]/).toString().slice(3, -1)
    client.guilds.find('name', gld).channels.find('name', chn).fetchMessages({
      limit: 50
    }).then(function (messages) {
      const msg = '**Last messages in #' + chn + '** (most recent first)\n\n' + messages.map(x => '**' + x.author.tag + ':** ' + x.content).join('\n')
      message.channel.send((msg.length > 2000 ? msg.substring(0, 1999) + '…' : msg))
    })
  } else {
    message.channel.send('Error: Invalid syntax or number of arguments!\nUsage: `' + process.env.PREFIX + command + ' [Guild] [Channel]`')
  };
} else {
  message.react('❎')
};
