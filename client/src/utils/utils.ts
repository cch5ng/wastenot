
interface ShoppingListItem {
  checked: boolean;
  list_item_map_guid: string;
  name: string | null;
  notify_timestamp: string | null;
  parentId: string;
  section: string;
  sortOrder: number;
  timestamp: string;
}

interface ListOfShoppingItems {
  id: ShoppingListItem;
}

interface ShoppingList {
  guid: string;
  name: string;
}

interface ShoppingListSummary {
  guid: ShoppingList;
}

interface MappedListItem {
  expiration_ms: string | null;
  guid: string;
  name: string;
}

export function objToArray(obj: ListOfShoppingItems | ShoppingListSummary) {
  let resultAr = []
  Object.keys(obj).forEach(ok => {
    resultAr.push(obj[ok]);
  })
  return resultAr;
}

//assumes array of objects where each object has an id key
export function arrayToObj(ar: Array<ShoppingList>) {
  let obj = {};
  ar.forEach(curObj => {
    let key = curObj.guid;
    obj[key] = curObj;
  });
  return obj;
}

export function mappedListItemsArToObj(ar: Array<MappedListItem>) {
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

export function getCookieStr(): string | null {
  const cookieKey = 'sessionStr';
  if (sessionStorage.getItem(cookieKey)) {
    return sessionStorage.getItem(cookieKey);
  } else {
    return null;
  }
}

export function daysToMilliseconds(daysNum: number): number {
  let msCnt = 1;
  msCnt = daysNum * 1000 * 60 * 60 * 24;
  return msCnt;
}
