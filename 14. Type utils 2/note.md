### JavaScript Prototypes – Clear Notes


### Main function discussion
- export function isPlainObject(value) {
  return (
    value !== null &&
    typeof value === "object" &&
    (Object.getPrototypeOf(value) === Object.prototype ||
      Object.getPrototypeOf(value) === null)
  );
}
- typeof null is object
- if we call Object.getPrototypeOf(x) where x is null or undefined -> throws an error.
- why error, We are trying to access that object's `[[Prototype]]`
- null check to filter out null
- type of object to filter out undefined
- why not needed for string/ number - for one 'abc' or 123 are internally wrapped with String and Number class, so .getPrototypeOf does not throw
- would be filtered at typeof value === "object" though
- Object.getPrototypeOf(value) === null to handle Object.create(null) 

<img width="540" height="494" alt="Screenshot 2026-01-18 at 12 13 48 AM" src="https://github.com/user-attachments/assets/8b3dd9a8-7ffc-4862-9cc0-02e6366e29d8" />

#### Core Concept
- Every JavaScript object has an internal slot called `[[Prototype]]`
- `[[Prototype]]` defines inheritance and property lookup
- `[[Prototype]]` is internal and cannot be accessed directly in code

#### Ways to Access the Prototype
- `Object.getPrototypeOf(obj)`
  - Standard and recommended way to read `[[Prototype]]`
- `obj.__proto__`
  - Legacy accessor for `[[Prototype]]`
  - Exists mainly for backward compatibility
  - Should be avoided in new code

#### `.prototype` (Different Thing)
- `.prototype` exists only on functions
- It is not the same as `[[Prototype]]`
- It defines what will become the `[[Prototype]]` of objects created using `new`

#### How `new` Works (Simplified)
- Creates a new empty object
- Sets the object’s `[[Prototype]]` to `Constructor.prototype`
- Calls the constructor with `this` bound to the new object
- Returns the new object

#### Key Relationships
- `Object.getPrototypeOf(instance) === Constructor.prototype`
- `instance.__proto__ === Constructor.prototype`
- `Constructor.prototype.__proto__ === Object.prototype`

#### `Object.create(proto)`
- Creates a new object
- Sets its `[[Prototype]]` directly to `proto`
- Does not call a constructor
- Does not use `.prototype`

#### Common Prototype Chains
- Plain object `{}`  
  `[[Prototype]] → Object.prototype → null`
- `Object.create(null)`  
  `[[Prototype]] → null`
- `new Constructor()`  
  `[[Prototype]] → Constructor.prototype → Object.prototype → null`

#### Common Mistakes
- Using `obj.prototype`  
  Only functions have `.prototype`
- Confusing `.prototype` with `[[Prototype]]`
- Treating `__proto__` as the real prototype

#### One Rule to Remember
- Functions have `.prototype`
- Objects have `[[Prototype]]`
