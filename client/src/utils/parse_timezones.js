const readline = require('readline');
const fs = require('fs');
let timeZoneAr = [];

fs.writeFile('db_timezone.js', `let dbTimezoneAr = [{value: 'none', label: 'Select a local timezone'}, `, (err) => {
    // throws an error, you could also catch it here
    if (err) throw err;

    // success case, the file was saved
    console.log('db_timezone.js started');
});

const readInterface = readline.createInterface({
  input: fs.createReadStream('zone1970.tab'),
  output: process.stdout,
  console: false
});

readInterface.on('line', function(line) {
  let lineAr = [];
  lineAr = line.split('\t');
  if (lineAr[0].indexOf('#') !== 0) {
    timeZoneAr.push(lineAr[2]);

    fs.appendFile('db_timezone.js', `{value: '${lineAr[2]}', label: '${lineAr[2]}'}, `, (err) => {
        if (err) throw err;
        console.log('db_timezone.js was updated!');
    });

  }
});

readInterface.on('close', function() {
    fs.appendFile('db_timezone.js', '];\n export default dbTimezoneAr;', (err) => {
        if (err) throw err;
        console.log('The lyrics were updated!');
    });
});


readInterface.on('finish', function() {
  console.log('timeZoneAr', timeZoneAr);
});
