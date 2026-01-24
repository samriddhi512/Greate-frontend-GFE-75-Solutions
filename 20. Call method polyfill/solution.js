/**
 * @param {any} thisArg
 * @param {...*} argArray
 * @return {any}
 */
Function.prototype.myCall = function (thisArg, ...argArray) {
  // good solution

  const context = thisArg === null ? globalThis : Object(thisArg); // the context u want the fn to have

  // unique key generation so to not overwrite any existing property on thisArg
  const key = Symbol();

  Object.defineProperty(context, key, {
    value: this,
    configurable: true
  })

  const result = context[key](...argArray);

  delete context[key];
  return result;
};

// just works solution
// const obj = thisArg ?? {};
// obj.fn = this;
// return obj.fn(...argArray);
