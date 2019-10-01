
export function objToArray(obj) {
  let resultAr = []
  Object.keys(obj).forEach(ok => {
    resultAr.push(obj[ok])
  })

  return resultAr;
}
