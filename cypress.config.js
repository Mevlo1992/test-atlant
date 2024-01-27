const { defineConfig } = require('cypress')

module.exports = defineConfig({
  fixturesFolder: 'cypress/fixtures',
  videosFolder: 'cypress/videos',
  screenshotsFolder: 'cypress/screenshots',
  video: true,
  videoUploadOnPasses: false,
  pageLoadTimeout: 60000,
  defaultCommandTimeout: 30000,
  requestTimeout: 25000,
  viewportWidth: 1920,
  viewportHeight: 1080,
  chromeWebSecurity: false,
  retries: 1,
  reporter: "cypress-qase-reporter",
  reporterOptions: {
    mode: "testops",
    apiToken: "e2f6b14aef66aff47a331a4d782369f8eb13a8523abfab8765505b2a3f7e296c",
    projectCode: "HDI",
    logging: true,
    screenshotFolder: 'screenshots',
    videoFolder: 'videos',
    sendScreenshot: true,
    sendVideo: true,
    runComplete: true,
    basePath: 'https://api.qase.io/v1'
  },

  env: {
    url: '',
    email: 'qauser@hdithinx.io',
    password: 'BeProfessional22',
    customerUserEmail: 'qauser+1@hdithinx.io',
    customerAdminEmail: 'qauser+2@hdithinx.io',
    waterMeterSensor: 'Water meter sensor',
    gateway: 'Gateway',
    floorSensor: 'Floor sensor'
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
