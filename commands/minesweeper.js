var minesweeper = new Minesweeper({
    rows: parseInt(args[0]),
    columns: parseInt(args[1]),
    mines: parseInt(args[2]),
    spaces: false
});
var matrix = minesweeper.start();
message.channel.send(matrix ? matrix : ":warning: You have provided invalid data!");
if (args.length == 0) message.channel.send("Tip: Use `" + process.env.PREFIX + "minesweeper <rows> <columns> <mines>` to customize the board.");
