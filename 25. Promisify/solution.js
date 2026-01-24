/**
 * @callback func
 * @returns Function
 */
export default function promisify(func) {
  return function promisifiedFunction(...args) {
    // REMEMBER: don't do (this, ...args) => this is not passes as a common arg
    const that = this; // actually take it from the context and give to the function
    return new Promise((resolve, reject) => {
      func.call(that, ...args, (err, data) => {
        if (err === null) resolve(data);
        else reject(err);
      });
    });
  };
}
