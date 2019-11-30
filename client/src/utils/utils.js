
export function objToArray(obj) {
  let resultAr = []
  Object.keys(obj).forEach(ok => {
    resultAr.push(obj[ok])
  })

  return resultAr;
}

export function getCookieStr() {
  const cookieKey = 'sessionStr';
  let cookieVal = sessionStorage.getItem(cookieKey);
  return cookieVal;
}
