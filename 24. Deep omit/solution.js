/**
 * @param {any} val
 * @param {Array<string>} keys
 * @returns any
 */
export default function deepOmit(val, keys) {
  if (typeof val !== "object") return val;
  if (Array.isArray(val)) {
    return val.map((ele) => {
      return deepOmit(ele, keys);
    });
  } else {
    const obj = { ...val };
    for (let k of keys) {
      delete obj[k];
    }
    for (let [k, v] of Object.entries(obj)) {
      if (v !== null && typeof v === "object") {
        obj[k] = deepOmit(v, keys);
      }
    }
    return obj;
  }
}

// NOTE: Aim to create a deep copied object with some keys omitted. Must not mutate the same object
// export default function deepOmit(val, keys) {
//   for(let k of keys) {
//     delete val[k];
//   }
//   for(let v of Object.values(val)) { // need to do here Object.values
//     deepOmit(v, keys);  // mutates the og array - don't do that
//   }
//   return val;
// }
