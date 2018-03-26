const config = require('./app/config');

module.exports = {
  baseUrl: 'http://localhost:' + config.url + '/',
  gridUrl: 'http://localhost:' + config.url + '/',

  browsers: {
    chrome: {
      desiredCapabilities: {
        browserName: 'chrome'
      }
    }
  },

  plugins: {
    'html-reporter/hermione': {
      path: 'hermione-html-report'
    }
  }

};
