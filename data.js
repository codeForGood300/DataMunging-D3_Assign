const fs = require('fs');
const readline = require('readline');
const stream = require('stream');

const instream = fs.createReadStream('Indicators.csv');
const outstream = new stream();
const rl = readline.createInterface(instream, outstream);
const logger = fs.createWriteStream('log.json', {});
const logger1 = fs.createWriteStream('log1.json', {});
logger.write('[');
logger.write('\n');
logger.write('\n');

logger1.write('[');
logger1.write('\n');
logger1.write('\n');


const list = ['Afghanistan', 'Armenia', 'Azerbaijan', 'Bahrain', 'Bangladesh', 'Bhutan', 'Brunei', 'Cambodia', 'China', 'Cyprus',
  'Georgia', 'India', 'Indonesia', 'Iran', 'Iraq', 'Israel', 'Japan', 'Jordan', 'Kazakhstan', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Lebanon',
  'Malaysia', 'Maldives', 'Mongolia', 'Myanmar', 'Nepal', 'North Korea', 'Oman', 'Pakistan', 'Palestine', 'Philippines', 'Qatar',
  'Saudi Arabia', 'Singapore', 'South Korea', 'Sri Lanka', 'Syria', 'Taiwan', 'Tajikistan', 'Thailand',
  'Timor-Leste', 'Turkey', 'Turkmenistan', 'United Arab Emirates', 'Uzbekistan', 'Vietnam', 'Yemen',
];

const mp = {};
const mp1 = {};
const a = {};
const b = {};

for (var i = 0; i < list.length; i += 1) { mp[list[i]] = 1; }

var c = 0;
var c1 = 0;

rl.on('line', (line) => {
  const y = line.split(',');

  if (y[0] === 'India' && (y[2] === 'Urban population (% of total)')) {
    a[y[4]] = [y[5]];
    // console.log(y[5]);
  }


  if (y[0] === 'India' && (y[2] === 'Rural population (% of total population)')) {
    b[y[4]] = [y[5]];
    // console.log(y[5]);
  }


  if ((mp[y[0]] === 1) && (y[2] === 'Urban population' || y[2] === 'Rural population')) {
    if (mp1[y[0]]) {
      mp1[y[0]] += parseInt(y[5], 10);
    } else { mp1[y[0]] = parseInt(y[5], 10); }
  }
});


rl.on('close', () => {
  for (var v in a, b) {
    c += 1;

    if (c === 55) {
      logger.write(`${'{' + '\n' + '"Year" : ' + '"'}${v}"` + ',' + '\n' +
                '"UValue" : ' + `"${a[v]}"` + ',' + '\n' + '"RValue" : ' + `"${b[v]}"` + '\n' + '}' + '\n' + '\n');
    } else {
      logger.write(`${'{' + '\n' + '"Year" : ' + '"'}${v}"` + ',' + '\n' +
                '"UValue" : ' + `"${a[v]}"` + ',' + '\n' + '"RValue" : ' + `"${b[v]}"` + '\n' + '},' + '\n' + '\n');
    }
  }


  const items = Object.keys(mp1).map(key => [key, mp1[key]]);

  // Sort the array based on the second element
  items.sort((first, second) => second[1] - first[1]);


  for (var v = 0; v < items.length; v += 1) {
    c1 += 1;
    if (c1 === 39) {
      logger1.write(`${'{' + '\n' + '"CountryName" : ' + '"'}${items[v][0]}",` + '\n' +
                `"Value" : ${items[v][1]}\n` + '}' + '\n' + '\n');
    } else {
      logger1.write(`${'{' + '\n' + '"CountryName" : ' + '"'}${items[v][0]}",` + '\n' +
                `"Value" : ${items[v][1]}\n` + '},' + '\n' + '\n');
    }
  }
  logger1.write(']');
  logger.write(']');
});
