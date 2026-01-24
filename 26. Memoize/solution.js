/**
 * @param {Function} func
 * @returns Function
 */
export default function memoize(func) {
  const map = new Map();

  return function memoFun(arg) {
    const that = this;
    if (map.has(arg)) return map.get(arg);
    else {
      const res = func.call(that, arg);
      map.set(arg, res);
      return res;
    }
  };
}

// NOTE: Here we have to use map only
// maps differentiate between '1' and 1
// objects only allow string keys. so '1' and 1 will internally are the same key