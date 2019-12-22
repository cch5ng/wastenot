
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
