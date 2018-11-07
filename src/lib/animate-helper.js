const MIN_MS = 25;

/**
 *
 * @param {number} changePerSecond
 * @param {number} multiplier the minimum multiplier
 * @returns {{multiplier: number, interval: number}}
 */
export const getMultiplierAndInterval = (changePerSecond, multiplier = 1) => {
  if ((1000 * multiplier) / changePerSecond > MIN_MS) {
    return {
      multiplier,
      interval: 1000 / changePerSecond,
    };
  }
  return getMultiplierAndInterval(changePerSecond, multiplier + 1);
};

/**
 * Animate a properties every animation frame
 * @param {Object} options
 * @param {number | function} options.increment the value to be increment each frame, or the function to increment the value
 * @param {number} [options.initialValue] the initial value of the property, defaulted to 0
 * @param {number} [options.resetValue] the value of the property when reset, defaulted to follow initialValue
 * @param {(value: number) => void} options.callback the callback to be invoked with the prop value each frame
 * @param {maxLimit} options.maxLimit the number when the prop should reset to initialValue. If no value provided, the value will never be reset
 * @param {() => void} options.onReset callback invoked when the animation is reset hitting maxLimit
 * @param {boolean} options.repeat state if the animation should repeat when hit maximum, default to true
 * @returns {() => void}  function to stop the animation
 */
export const animate = ({
  increment,
  initialValue = 0,
  resetValue = initialValue,
  callback,
  maxLimit,
  repeat = true,
  onReset = () => {},
} = {}) => {
  let rafId;
  let value = initialValue;
  const diff = typeof increment === 'function' ? increment : x => x + increment;

  function tick() {
    if (!maxLimit || value < maxLimit) {
      value = diff(value);
    } else {
      if (!repeat) return;
      value = resetValue;
      onReset();
    }
    callback(value);
    rafId = window.requestAnimationFrame(tick);
  }

  rafId = window.requestAnimationFrame(tick);

  return () => window.cancelAnimationFrame(rafId);
};
