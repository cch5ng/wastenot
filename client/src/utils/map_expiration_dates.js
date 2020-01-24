import { EXPIRATION_DATES } from './expiration_dates';

const removePunctuation = (str) => {
  let cleanStr;
  const punctuation = [',', '(', ')', '.'];
  punctuation.forEach(pMark => {
    let re = /[,().]/g
    cleanStr = str.replace(re, '');
  })
  return cleanStr;
}

const getSubstringMatchCount = (ar1, ar2) => {
  let matchCnt = 0;
  let shorterAr = (ar1.length < ar2.length === true) ? ar1 : ar2;

  shorterAr.forEach(item => {
    if (ar2.indexOf(item) > -1) {
      matchCtn += 1;
    }
  })

  return matchCnt;
}

const getExpirationDate = (item, EXPIRATION_DATES) => {
  let expirationKeys = Object.keys(EXPIRATION_DATES);
  let itemNoPunctuation;
  let highestSubstringMatchCount = 0;
  let highestSubstringMatchIdx;
  let key;

  //case exact string match
  if (expirationKeys.indexOf(item) > -1) {
    let idx = expirationKeys.indexOf(item);
    key = expirationKeys[idx];
    return EXPIRATION_DATES[key].refrigeratorInt;
  }

  //highest substring match (does this need to be in order or just a combination)
  //get 2 arrays where each string has been parsed using string.split('') but what to do about punctuation
  //remove punctuation
  //split string into array of indiv words
  itemNoPunctuation = removePunctuation(item);
  let itemWordAr = itemNoPunctuation.split(' ');
  for (let i = 0; i < expirationKeys.length; i++) {
    let expirationKeyNoPunctuation = removePunctuation(expirationKeys[i]);
    let expirationKeyWordAr = expirationKeyNoPunctuation.split(' ');
    let substringMatchCount = getSubstringMatchCount(itemWordAr, expirationKeyWordAr);
    if (substringMatchCount > highestSubstringMatchCount) {
      highestSubstringMatchCount = substringMatchCount;
      highestSubstringMatchIdx = i;
    }
  }
  key = expirationKeys[highestSubstringMatchIdx];
  return EXPIRATION_DATES[key].refrigeratorInt;
}

module.exports = {
  removePunctuation,
  getSubstringMatchCount,
  getExpirationDate
};