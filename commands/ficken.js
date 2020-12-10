if (/\[.+\] \[.+\]/.test(args.join(' '))) {
  message.channel.send('toll\ndieses ding beim ' + args.join(' ').match(/\[.+\] \[/).toString().slice(1, -3) + ' ab\ndieses um das ' + args.join(' ').match(/\] \[.+\]/).toString().slice(3, -1) + '\nFICKen')
} else {
  message.channel.send('toll\ndieses ding beim kopfhörer ab\ndieses um das ohr\nFICKen')
};
