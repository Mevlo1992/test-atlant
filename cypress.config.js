const { defineConfig } = require('cypress')

module.exports = defineConfig({
  headed:"true",
  fixturesFolder: 'cypress/fixtures',
  videosFolder: 'cypress/videos',
  screenshotsFolder: 'cypress/screenshots',
  pageLoadTimeout: 60000,
  defaultCommandTimeout: 30000,
  requestTimeout: 25000,
  viewportWidth: 1920,
  viewportHeight: 1080,
  chromeWebSecurity: false,
  retries: 1,
  env: {
    url: '',
    password: 'randompw',
    userFirstName: 'Nermin',
    userLastName: 'Sahman'
  },

  e2e: {
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    supportFile: 'cypress/support/index.js',
    specPattern: 'cypress/integration/**/*.cy.js',
    baseUrl: 'https://thinking-tester-contact-list.herokuapp.com/'
  }
})
