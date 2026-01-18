// You are free to use alternative approaches of
// instantiating the EventEmitter as long as the
// default export has the same interface.

export default class EventEmitter {
  constructor() {
    this.map = new Map();
  }

  /**
   * @param {string} eventName
   * @param {Function} listener
   * @returns {EventEmitter}
   */
  on(eventName, listener) {
    if (this.map.has(eventName)) {
      this.map.get(eventName).push(listener);
    } else {
      this.map.set(eventName, [listener]);
    }
    return this;
  }

  /**
   * @param {string} eventName
   * @param {Function} listener
   * @returns {EventEmitter}
   */
  off(eventName, listener) {
    if (this.map.has(eventName)) {
      const updated = this.getUpdatedListeners(eventName, listener);
      if (updated.length) {
        this.map.set(eventName, updated);
      } else {
        this.map.delete(eventName); // this is IMPORTANT! - as it will fail true false cases on emit
      }
    }
    return this;
  }

  /**
   * @param {string} eventName
   * @param  {...any} args
   * @returns {boolean}
   */
  emit(eventName, ...args) {
    if (this.map.has(eventName)) {
      this.map.get(eventName).forEach((l) => l(...args));
      return true;
    }
    return false;
  }

  getUpdatedListeners(eventName, listener) {
    const listeners = this.map.get(eventName);
    let i = listeners.indexOf(listener);

    if (i < listeners.length) {
      return listeners.filter((l, idx) => idx !== i);
    }

    return this.map.get(eventName);
  }
}
