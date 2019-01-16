module.exports = {
  generateRandom(max = 1000, min = 0, decimal = 2) {
    return parseFloat((Math.random() * (max - min + 1) + min).toFixed(decimal));
  }
};
