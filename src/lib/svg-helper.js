/**
 * @param {string} elementName
 * @param {Object} attributes
 */
export const createSvgElement = (elementName, attributes = {}) => {
  const element = document.createElementNS(
    'http://www.w3.org/2000/svg',
    elementName
  );

  Object.keys(attributes).forEach(key => {
    element.setAttribute(key, attributes[key]);
  });

  return element;
};
