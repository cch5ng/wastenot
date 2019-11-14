const SHA256 = require('crypto-js/sha256');

const hash = string => {
  return SHA256(`${process.env.APP_SECRET}${string}${process.env.APP_SECRET}`).toString();
}

module.exports = { hash };
