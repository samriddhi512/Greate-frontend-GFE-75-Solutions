/**
 * @template T
 * @param {T} value
 * @return {T}
 */
export default function deepClone(value) {
  if (Array.isArray(value)) {
    const res = [];
    value.forEach((element) => {
      res.push(deepClone(element));
    })
    return res;
  } else if (value !== null && typeof value === 'object') {
    const res = {};
    for(let [key, val] of Object.entries(value)) {
      res[key] = deepClone(val);
    }
    return res;
  }
  return value;
}