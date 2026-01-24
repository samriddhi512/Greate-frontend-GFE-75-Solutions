/**
 * @param {Array<any>} iterable
 * @param {Function} callbackFn
 * @param {number} size
 *
 * @return {Promise}
 */
export default function mapAsyncLimit(iterable, callbackFn, size) {
  const n = iterable.length;
  if (n == 0) return Promise.resolve([]);
  const result = new Array(n);
  const limit = size ?? n;

  let i = 0;
  let executing = 0;

  function callcbfn(cur, resolve, reject) {
    callbackFn(iterable[cur])
      .then((res) => {
        result[cur] = res;
        if (i < n) {
          callcbfn(i++, resolve, reject); // continue executing
        } else {
          executing--;
          if (executing === 0) resolve(result); // only resolve after complete
        }
      })
      .catch((err) => {
        reject(err); // one rejects = reject all
      });
  }

  return new Promise((resolve, reject) => {
    while (executing < limit && i < n) {
      executing++;
      callcbfn(i++, resolve, reject);
    }
  });
}