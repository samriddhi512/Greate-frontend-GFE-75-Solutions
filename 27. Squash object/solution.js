/**
 * @param {Object} obj
 * @return {Object}
 */
export default function squashObject(obj) {
  const newobj = new Object();
  for (let [k, v] of Object.entries(obj)) {
    if (v === null || v === undefined) {
      newobj[k] = v;
    } else if (typeof v === "object") {
      for (let [kv, vv] of Object.entries(squashObject(v))) {
        let key = k;
        if (key && kv) key = key + '.' + kv;
        else if (kv) key = kv;
        newobj[key] = vv;
      }
    } else {
      newobj[k] = v;
    }
  }
  return newobj;
}
