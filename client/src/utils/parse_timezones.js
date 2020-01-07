const readline = require('readline');
const fs = require('fs');
let timeZoneAr = [];

fs.writeFile('db_timezone.js', 'let dbTimezoneAr = [', (err) => {
    // throws an error, you could also catch it here
    if (err) throw err;

    // success case, the file was saved
    console.log('db_timezone.js started');
});

// let writeStream = fs.createWriteStream('db_timezone.js');

// // write some data with a base64 encoding
// writeStream.write('let dbTimezoneAr = [', 'utf8');

// the finish event is emitted when all data has been flushed from the stream

//////

const readInterface = readline.createInterface({
  input: fs.createReadStream('zone1970.tab'),
  output: process.stdout,
  console: false
});

readInterface.on('line', function(line) {
  let lineAr = [];
  lineAr = line.split('\t');
  //console.log('lineAr', lineAr)
  //console.log('len lineAr', lineAr.length)
  if (lineAr[0].indexOf('#') !== 0) {
    timeZoneAr.push(lineAr[2]);

    fs.appendFile('db_timezone.js', `${lineAr[2]}, `, (err) => {
        if (err) throw err;
        console.log('db_timezone.js was updated!');
    });

    //writeStream.write(lineAr[2], 'utf8');
  }
});

readInterface.on('close', function() {
  //writeStream.write('];', 'utf8');
    fs.appendFile('db_timezone.js', '];\n export default dbTimezoneAr;', (err) => {
        if (err) throw err;
        console.log('The lyrics were updated!');
    });
})


readInterface.on('finish', function() {
  console.log('timeZoneAr', timeZoneAr);
})

// writeStream.on('finish', () => {
//     console.log('wrote all data to file');
// });

// // close the stream
// writeStream.end();


