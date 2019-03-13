var commandSort = [];
for (var commandCurr in cmdcnt) {
	commandSort.push([commandCurr, cmdcnt[commandCurr]]);
};
commandSort.sort(function(a, b) {
	return a[1] - b[1];
});
var temp = "**Command Counter:**\n";
for (var indx in commandSort.reverse()) {
	var commandSTmp = commandSort[indx].toString().split(",");
	temp += commandSTmp[0] + ": " + commandSTmp[1] + ", ";
};
message.channel.send(temp.slice(0, -2));
