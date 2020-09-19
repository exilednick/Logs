/* This module reads the example text file
   and then executes the callback function */

const fs = require('fs');
const readLine = require('readline');
let txt =[];

function stream(path,callback) {
  const fileStream = fs.createReadStream(path);
  const rl = readLine.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  rl.on('line', line => {
    txt.push(line);
  });

  rl.on('close', () => callback(txt));
}

module.exports.stream = stream;
