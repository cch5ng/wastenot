import { EXPIRATION_DATES } from './expiration_dates';

const removePunctuationLowerCase = (str) => {
  let cleanStr;
  const punctuation = [',', '(', ')', '.'];
  str = str.toLowerCase();
  punctuation.forEach(pMark => {
    let re = /[,().]/g
    cleanStr = str.replace(re, '');
  })
  return cleanStr;
}

const getSubstringMatchCount = (ar1, ar2) => {
  let matchCnt = 0;
  let shorterAr = (ar1.length < ar2.length === true) ? ar1 : ar2;
  let longerAr = (ar1.length < ar2.length === true) ? ar2 : ar1;

  shorterAr.forEach(item => {
    if (longerAr.indexOf(item) > -1) {
      matchCnt += 1;
    }
  })

  return matchCnt;
}

const getExpirationCategory = (item, EXPIRATION_DATES) => {
  let expirationKeys = Object.keys(EXPIRATION_DATES);
  let itemNoPunctuation;
  let highestSubstringMatchCount = 0;
  let highestSubstringMatchIdx;
  let key;

  //case exact string match
  if (expirationKeys.indexOf(item) > -1) {
    let idx = expirationKeys.indexOf(item);
    key = expirationKeys[idx];
    return key;
  }

  //highest substring match (does this need to be in order or just a combination)
  //get 2 arrays where each string has been parsed using string.split('') but what to do about punctuation
  //remove punctuation
  //split string into array of indiv words
  itemNoPunctuation = removePunctuationLowerCase(item);
  let itemWordAr = itemNoPunctuation.split(' ');
  for (let i = 0; i < expirationKeys.length; i++) {
    let expirationKeyNoPunctuation = removePunctuationLowerCase(expirationKeys[i]);
    let expirationKeyWordAr = expirationKeyNoPunctuation.split(' ');
    let substringMatchCount = getSubstringMatchCount(itemWordAr, expirationKeyWordAr);
    if (substringMatchCount > highestSubstringMatchCount) {
      highestSubstringMatchCount = substringMatchCount;
      highestSubstringMatchIdx = i;
    }
  }

  if (highestSubstringMatchIdx) {
    key = expirationKeys[highestSubstringMatchIdx];
    return key;
  } else {
    return 'none';
  }
}

const getExpirationDate = (item, EXPIRATION_DATES) => {
  // let expirationKeys = Object.keys(EXPIRATION_DATES);
  // let itemNoPunctuation;
  // let highestSubstringMatchCount = 0;
  // let highestSubstringMatchIdx;
  let key = getExpirationCategory(item, EXPIRATION_DATES);
  if (key !== 'none') {
    console.log('key', key)
    return EXPIRATION_DATES[key].refrigeratorInt;
  }
  return null;

  //case exact string match
  // if (expirationKeys.indexOf(item) > -1) {
  //   let idx = expirationKeys.indexOf(item);
  //   key = expirationKeys[idx];
  //   return EXPIRATION_DATES[key].refrigeratorInt;
  // }

  //highest substring match (does this need to be in order or just a combination)
  //get 2 arrays where each string has been parsed using string.split('') but what to do about punctuation
  //remove punctuation
  //split string into array of indiv words
  // itemNoPunctuation = removePunctuation(item);
  // let itemWordAr = itemNoPunctuation.split(' ');
  // for (let i = 0; i < expirationKeys.length; i++) {
  //   let expirationKeyNoPunctuation = removePunctuation(expirationKeys[i]);
  //   let expirationKeyWordAr = expirationKeyNoPunctuation.split(' ');
  //   let substringMatchCount = getSubstringMatchCount(itemWordAr, expirationKeyWordAr);
  //   if (substringMatchCount > highestSubstringMatchCount) {
  //     highestSubstringMatchCount = substringMatchCount;
  //     highestSubstringMatchIdx = i;
  //   }
  // }

  // if (highestSubstringMatchIdx) {
  //   key = expirationKeys[highestSubstringMatchIdx];
  //   return EXPIRATION_DATES[key].refrigeratorInt;
  // } else {
  //   return null;
  // }
}

//module.exports = {
export {
  removePunctuationLowerCase,
  getSubstringMatchCount,
  getExpirationDate,
  getExpirationCategory
};
