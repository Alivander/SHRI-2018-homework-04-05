const config = require('../config');

module.exports = {
  baseUrl: 'http://localhost:' + config.url + '/',
  gridUrl: 'http://localhost:' + config.url + '/',

  browsers: {
    chrome: {
      desiredCapabilities: {
        browserName: 'chrome'
      }
    }
  }

};
