try {
  if (message.attachments.first()) {
    request({
      url: message.attachments.first().url,
      encoding: null
    }, async function (error, response, body) {
      message.channel.send('.' + await FileType.fromBuffer(body).ext + ' | ' + fileType(body).mime)
    })
  } else if (args && args != '') {
    request({
      url: args.join(' '),
      encoding: null
    }, async function (error, response, body) {
      message.channel.send('.' + await FileType.fromBuffer(body).ext + ' | ' + fileType(body).mime)
    })
  } else {
    message.react('❎')
  };
} catch (e) {
  message.react('❎')
};
