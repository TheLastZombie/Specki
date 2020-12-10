if (args && args != '') {
  let temp = args.join(' ').split('')
  let swch = true
  for (let i = 0; i < temp.length; i++) {
    if (temp[i].match(/\s/)) {
      continue
    } else {
      if (swch) {
        temp[i] = temp[i].toUpperCase()
      } else {
        temp[i] = temp[i].toLowerCase()
      };
      swch = !swch
    };
  };
  temp = temp.join('')
  message.channel.send(temp)
} else {
  message.channel.fetchMessages({
    limit: 2
  }).then(temp => {
    var temp = temp.last().content.split('')
    let swch = true
    for (let i = 0; i < temp.length; i++) {
      if (temp[i].match(/\s/)) {
        continue
      } else {
        if (swch) {
          temp[i] = temp[i].toUpperCase()
        } else {
          temp[i] = temp[i].toLowerCase()
        };
        swch = !swch
      };
    };
    temp = temp.join('')
    message.channel.send(temp)
  })
};
