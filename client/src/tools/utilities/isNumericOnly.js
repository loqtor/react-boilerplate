/**
* Regex to test if a string contains only numeric
* characters
*
* @param {String} string An input string to be validated
*/
const isNumericOnly = string => /^[0-9\b]+$/.test(string);

export default isNumericOnly;
