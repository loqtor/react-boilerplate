/**
 * Tests whether variable is a function
 *
 * @param {functionToCheck} any any variable to see if it's a function
 */
const isFunction = functionToCheck => functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';

export default isFunction;
