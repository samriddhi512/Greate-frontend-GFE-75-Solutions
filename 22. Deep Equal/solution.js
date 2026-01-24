/**
 * @param {*} valueA
 * @param {*} valueB
 * @return {boolean}
 */
export default function deepEqual(valueA, valueB) {
  if (valueA === null || valueB === null) {
    return valueA === valueB;
  }
  if (Array.isArray(valueA) || Array.isArray(valueB)) {
    if (Array.isArray(valueA) && Array.isArray(valueB) && valueA.length === valueB.length) {
      for(let i=0; i<valueA.length;i++) {
        if(!deepEqual(valueA[i], valueB[i])) return false;
      }
      return true;
    } else return false;
  }
  if (typeof valueA === 'object' && typeof valueB === 'object' ) {
    if (Object.entries(valueA).length === Object.entries(valueB).length) {
      for (let [key, val] of Object.entries(valueA)) {
        if (!deepEqual(val, valueB[key])) return false;
      }
      return true;
    }
  }
  return valueA === valueB;
}