function clear() {
  var stdout = "";

  if (process.platform.indexOf("win") != 0) {
    stdout += "\033[2J";
  } else {
    var lines = process.stdout.getWindowSize()[1];

    for (var i = 0; i < lines; i++) {
      stdout += "\r\n";
    }
  }

  // Reset cursur
  stdout += "\033[0f";

  process.stdout.write(stdout);
}
module.exports = {
  clear,
  deleteFolderRecursive
}