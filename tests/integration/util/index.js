const util = {
  randomIndex: (min, max) =>
  /* eslint-disable no-mixed-operators */
    Math.round(min - 0.5 + Math.random() * (max - min + 1)),
  /* eslint-anable no-mixed-operators */

};

module.exports = util;
