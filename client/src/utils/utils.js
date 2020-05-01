
export function objToArray(obj) {
  let resultAr = []
  Object.keys(obj).forEach(ok => {
    resultAr.push(obj[ok])
  })

  return resultAr;
}

//assumes array of objects where each object has an id key
export function arrayToObj(ar) {
  let obj = {};

  ar.forEach(curObj => {
    let key = curObj.guid;
    obj[key] = curObj;
  })

  return obj;
}

export function getCookieStr() {
  const cookieKey = 'sessionStr';
  if (sessionStorage.getItem(cookieKey)) {
    return sessionStorage.getItem(cookieKey);
  } else {
    return null;
  }
}

export function mappedListItemsArToObj(ar) {
  let obj = {};
  ar.forEach(it => {
    let key = it.name;
    obj[key] = { 
      expiration_ms: parseInt(it.expiration_ms, 10),
      guid: it.guid
    };
  });
  return obj;
}

export function daysToMilliseconds(daysNum) {
  let msCnt = 1;
  msCnt = daysNum * 1000 * 60 * 60 * 24;
  return msCnt;
}
