/**
 * Used for default params/props
 */
export const noop = () => {
  /* noop */
};

/**
 * Throttle the function so that it only call maximum once within the limit
 * @param {function} func
 * @param {number} limit
 */
export const throttle = (func, limit) => {
  /**
   * @type {function}
   */
  let lastFunc;

  /**
   * @type {number}
   */
  let lastRan;

  return function() {
    const context = this;
    const args = arguments;
    if (!lastRan) {
      func.apply(context, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(function() {
        if (Date.now() - lastRan >= limit) {
          func.apply(context, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
};
