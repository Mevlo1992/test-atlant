# Cypress Test Automation Solution

This repository contains an end-to-end (E2E) test automation solution using Cypress for testing a web application that includes both UI and API endpoints.

## Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [Cypress](https://docs.cypress.io/guides/getting-started/installing-cypress.html)

## Project Structure

- **cypress/integration:** Directory for Cypress test spec files.

## Test Scenarios

### Smoke Tests

The `smoke.spec.js` file contains smoke tests, including adding a new user, verifying the user can add a contact, and cleaning up the created data afterward.

### UI Tests

The UI tests contain tests specific to the specific pages (Login Page, Contact List Page etc.).

### API Tests

API Users Flow
This block contains API tests for user-related operations, including adding a user, getting user profile, updating user, logging out, and more.

API Contacts Flow
This block contains API tests for contact-related operations, including adding a user, adding a contact, getting contact list, updating contact, deleting contact, and more.

## Running Tests
Use the following scripts defined in the package.json file to run different test scenarios:

npm run cy:open: Open Cypress in interactive mode.
npm run cy:run: Run all tests in headed mode with Chrome.
npm run cy:run_api: Run API tests.
npm run test:e2e:chrome: Run all E2E tests with Chrome.
npm run test:smoke: Run smoke tests with Chrome.
npm run test:regression: Run regression tests with Chrome.
npm run test:single:spec: Run a single spec file with Chrome.
Feel free to customize the scripts or add more as needed.

## Additional Information
cypress/support/utils: Contains utility functions used in test scripts.
cypress/support/index.js: Custom support file for Cypress configuration.