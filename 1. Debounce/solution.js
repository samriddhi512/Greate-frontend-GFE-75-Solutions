/**
 * @param {Function} func
 * @param {number} wait
 * @return {Function}
 */
export default function debounce(func, wait) {
  let timout;
  return function debounced(...args) {
    if (timout) clearTimeout(timout);
    timout = setTimeout(() => {
      func.call(this, ...args);
    }, wait);
  };
}