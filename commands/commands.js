var commandSort = [];
for (var commandCurr in cmdcnt) {
	commandSort.push([commandCurr, cmdcnt[commandCurr]]);
};
commandSort.sort(function(a, b) {
	return a[1] - b[1];
});
var temp = "**Command-Counter**\n\n";
for (var indx in commandSort.reverse()) {
	var commandSTmp = commandSort[indx].toString().split(",");
	temp += "`" + commandSTmp[0] + "` " + commandSTmp[1] + "\n";
};
message.channel.send(temp);