const commandSort = []
for (const commandCurr in cmdcnt) {
  commandSort.push([commandCurr, cmdcnt[commandCurr]])
};
commandSort.sort(function (a, b) {
  return a[1] - b[1]
})
let temp = '**Command Counter:**\n'
for (const indx in commandSort.reverse()) {
  const commandSTmp = commandSort[indx].toString().split(',')
  temp += commandSTmp[0] + ': ' + commandSTmp[1] + ', '
};
message.channel.send(temp.slice(0, -2))
