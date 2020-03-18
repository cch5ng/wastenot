
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
      expiration_days: it.expiration_days,
      guid: it.guid
    };
  });
  return obj;
}
