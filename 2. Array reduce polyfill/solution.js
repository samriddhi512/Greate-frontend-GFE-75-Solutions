/**
 * @template T, U
 * @param {(previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U} callbackFn
 * @param {U} [initialValue]
 * @return {U}
 */
Array.prototype.myReduce = function (callbackFn, initialValue) {
  let acc = initialValue;
  let start = 0;
  if (initialValue == undefined) {
    if (this.length == 0) throw new Error('Empty Array')
    start = 1;
    acc = this[0] || 0;
  };
  for(let i=start;i<this.length;i++) {
    if (!(i in this)) continue;
    acc = callbackFn( acc, this[i], i, this);
  }

  return acc;
};

// reduce callback can use FOUR things: acc, curr, index, the array itself!! in this order
// if no init value provided use the first index item as acc
// if no init value and array empty - throw error
// if init value but array empty return init value
// skip over array empty slots (sparse arrays)
