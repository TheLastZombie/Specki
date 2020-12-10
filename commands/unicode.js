if (args && args != '') {
  const temp = [['Character', 'Code', 'Name']]
  for (i = 0; i < args.join(' ').replace(/[\x00-\x1F\x7F-\x9F]/g, '').length; i++) {
    for (j = 0; j < 29; j++) {
      const code = require('unicode/category/' + ['Cc', 'Cf', 'Co', 'Cs', 'Ll', 'Lm', 'Lo', 'Lt', 'Lu', 'Mc', 'Me', 'Mn', 'Nd', 'Nl', 'No', 'Pc', 'Pd', 'Pe', 'Pf', 'Pi', 'Po', 'Ps', 'Sc', 'Sk', 'Sm', 'So', 'Zl', 'Zp', 'Zs'][j])[args.join(' ').replace(/[\x00-\x1F\x7F-\x9F]/g, '').charCodeAt(i)]
      if (code) {
        temp[i + 1] = [args.join(' ').replace(/[\x00-\x1F\x7F-\x9F]/g, '')[i], code.value, code.name]
        break
      };
    };
  };
  message.channel.send('```' + table(temp, {
    border: {
      topBody: '─',
      topJoin: '┬',
      topLeft: '┌',
      topRight: '┐',
      bottomBody: '─',
      bottomJoin: '┴',
      bottomLeft: '└',
      bottomRight: '┘',
      bodyLeft: '│',
      bodyRight: '│',
      bodyJoin: '│',
      joinBody: '─',
      joinLeft: '├',
      joinRight: '┤',
      joinJoin: '┼'
    }
  }) + '```')
} else {
  message.react('❎')
};
