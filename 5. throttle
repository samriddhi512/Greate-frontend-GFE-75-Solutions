/**
 * @callback func
 * @param {number} wait
 * @return {Function}
 */
export default function throttle(func, wait) {
  let called = false;

  return function throttledFunc(...args) {
    if (called) return;
    called = true;
    setTimeout(()=> called = false, wait);
    func.call(this, ...args);
  }
}
