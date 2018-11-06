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
