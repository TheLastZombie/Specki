if (args && args != '') {
  if (is(args.join(' ')).thirteen()) {
    message.react('✅')
  } else {
    message.react('❎')
  };
} else {
  message.channel.fetchMessages({
    limit: 2
  }).then(temp => {
    if (is(temp.last().content).thirteen()) {
      message.react('✅')
    } else {
      message.react('❎')
    };
  })
};
