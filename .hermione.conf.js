const { host, port } = require('./app/config');

module.exports = {
  baseUrl: `http://${host}:${port}`,
  gridUrl: 'http://localhost:4444/wd/hub',

  sets: {
    common: {
      files: './tests/integration/**/*.js'
    }
  },

  browsers: {
    chrome: {
      desiredCapabilities: {
        browserName: 'chrome'
      }
    },
    firefox: {
      desiredCapabilities: {
        browserName: 'firefox'
      }
    }
  },

  plugins: {
    'html-reporter/hermione': {
      path: './report',
      defaultView: 'all'
    }
  }

};
