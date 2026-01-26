/**
 * @param {Function} func
 * @return {Function}
 */

export default function curry(func) {
  return function curriedfn(...args) {
    if (args.length >= func.length) {
      // return func.call(this, ...args);
      return func.apply(this, args);
    }

    // need to return a function which may be invoked
    // return (...newArgs) => {
    //   if (newArgs?.length) {
    //     return curriedfn.apply(this, [...args, ...newArgs]);
    //   } else {
    //     return curriedfn.apply(this, args);
    //   }
    // };

    return curriedfn.bind(this, ...args);
  };
}

// 1. get a functions args needed - function.length
// 2. this in a function - context/ref to object its called on
// 3. how to return the current executing function

// export default function curry(func) {
//   const args = [];  ----------- shared for one returned func
//   const k = func.length;

//   return function curriedfunc (arg) { ---------- returned function
//     args.push(arg);
//     if (args.length === k) {
//       return func(...args);
//     }
//     return curriedfunc;
//   }
// }
//

// SOLID EXAMPLE OF WHEN TO USE ARROW VS FUNCTION
