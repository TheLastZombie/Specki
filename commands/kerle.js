if (args && args != '') {
  message.channel.send('Es ist ' + args.join(' ') + ', meine Kerle!')
} else {
  const temp = new Date()
  message.channel.send('Es ist ' + ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'][temp.getDay()] + ', meine Kerle!')
};
