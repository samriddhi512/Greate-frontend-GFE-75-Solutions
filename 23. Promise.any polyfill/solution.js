/**
 * @param {Array} iterable
 * @return {Promise}
 */
export default function promiseAny(iterable) {
  const n = iterable.length;
  if (n === 0) return new AggregateError([]);

  let processed = 0;
  const result = new Array(n);

  return new Promise((resolve, reject) => {
    for (let i = 0; i < n; i++) {
      Promise.resolve(iterable[i])
        .then((res) => resolve(res))
        .catch((err) => {
          processed++;
          result[i] = err;
          if (processed == n) reject(new AggregateError(result));
        });
    }
  });
}


// NOTE:
// Promise any rejects with an aggregate error.
// if any successfully resolved - return res;
// if all error - only then return an aggregate error with the error containing all error's info
// in case empty array empty array aggregate error