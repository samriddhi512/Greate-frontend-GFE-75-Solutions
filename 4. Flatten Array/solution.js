/**
 * @param {Array<*|Array>} value
 * @return {Array}
 */
export default function flatten(value) {
  let flatray = [];

  for(let i=0;i<value.length;i++) {
    const element = value[i];
    if (Array.isArray(element)) {
      flatray.push(...flatten(element)); // only flatten arrays
    } else {
      flatray.push(element); // everything else push as is
    }
  } 

  return flatray;
}
