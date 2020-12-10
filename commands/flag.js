if (message.attachments.first()) {
  jimp.read(message.attachments.first().url, (error, temp) => {
    jimp.read(__dirname + '/images/flag.png', (error, flag) => {
      flag.resize(temp.bitmap.width, temp.bitmap.height, jimp.RESIZE_NEAREST_NEIGHBOR).opacity(0.5)
      temp.composite(flag, 0, 0).write(__dirname + '/images/temp.png', function () {
        message.channel.send({
          files: [{
            attachment: __dirname + '/images/temp.png',
            name: 'flag.png'
          }]
        })
      })
    })
  })
} else if (args && args != '') {
  jimp.read(args.join(' '), (error, temp) => {
    jimp.read(__dirname + '/images/flag.png', (error, flag) => {
      flag.resize(temp.bitmap.width, temp.bitmap.height, jimp.RESIZE_NEAREST_NEIGHBOR).opacity(0.5)
      temp.composite(flag, 0, 0).write(__dirname + '/images/temp.png', function () {
        message.channel.send({
          files: [{
            attachment: __dirname + '/images/temp.png',
            name: 'flag.png'
          }]
        })
      })
    })
  })
} else {
  message.react('❎')
};
