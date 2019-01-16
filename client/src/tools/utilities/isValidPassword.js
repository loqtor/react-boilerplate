/**
* Regex to test if a string has at least one
* uppercase character and one
* numeric character
*
* @param {String} string An input string to be validated
*/
const isValidPassword = string => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{8,}$/.test(string);

export default isValidPassword;
