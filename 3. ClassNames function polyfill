/**
 * @param {...(any|Object|Array<any|Object|Array>)} args
 * @return {string}
 */
export default function classNames(...args) {
  // args => always an array.
  let ans = [];
  for(let i=0;i<args.length;i++) {
    if (!args[i]) continue;
    if (typeof(args[i]) === 'string' || typeof(args[i]) === 'number') {
      ans.push(args[i]);
    } else if (Array.isArray(args[i])) {
      ans.push(classNames(...args[i])); // return a string of array val
    } else if (typeof(args[i]) === 'object') {
      for(let [key, val] of Object.entries(args[i])) {
        if (val) ans.push(key);
      }
    }
  }

  return ans.join(' ');
}
