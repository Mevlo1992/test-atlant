// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import { CommonActions } from "./commonActions"
import { contactDetailsPageLocators } from "../../pages/contactDetailsPage/contactDetailsPageLocators"
import { contactListPageLocators } from "../../pages/contactListPage/contactListPageLocators"
import { loginPageLocators } from "../../pages/loginPage/loginPageLocators"
import { CommonLocators } from "./commonLocators"


const commonActions = new CommonActions
const commonLocators = new CommonLocators
const contactDetails = new contactDetailsPageLocators
const contactList = new contactListPageLocators
const loginPage = new loginPageLocators


Cypress.Commands.add('addNewUserAndLogin', (email) => {
    cy.visit('')
    commonActions.clickElementAtIndex(loginPage.signUpBtn)
    commonActions.populateInputAtIndex(commonLocators.firstNameInputField, Cypress.env('userFirstName'))
    commonActions.populateInputAtIndex(loginPage.lastNameInputField, Cypress.env('userLastName'), 0)
    commonActions.populateInputAtIndex(commonLocators.emailInputField, email)
    commonActions.populateInputAtIndex(loginPage.passwordInputField, Cypress.env('password'))
    commonActions.clickElementAtIndex(commonLocators.submitBtn)
    commonActions.clickElementAtIndex(contactList.logoutBtn)
    cy.wait(2000)
    commonActions.populateInputAtIndex(commonLocators.emailInputField, email)
    commonActions.populateInputAtIndex(loginPage.passwordInputField, Cypress.env('password'))
    commonActions.clickElementAtIndex(commonLocators.submitBtn)

})

Cypress.Commands.add('addNewUser', (userEmail) => {
    cy.visit('')
    commonActions.clickElementAtIndex(loginPage.signUpBtn)
    commonActions.populateInputAtIndex(commonLocators.firstNameInputField, Cypress.env('userFirstName'))
    commonActions.populateInputAtIndex(commonLocators.lastNameInputField, Cypress.env('userLastName'))
    commonActions.populateInputAtIndex(commonLocators.emailInputField, userEmail)
    commonActions.populateInputAtIndex(loginPage.passwordInputField, Cypress.env('password'))
    commonActions.clickElementAtIndex(commonLocators.submitBtn)
    commonActions.clickElementAtIndex(contactList.logoutBtn)
})

Cypress.Commands.add('addNewContact', (contactFirstName, contactLastName) => {
    
    cy.wait(2000)
    commonActions.clickElementAtIndex(contactList.addNewContactBtn)
    commonActions.populateInputAtIndex(commonLocators.firstNameInputField, contactFirstName)
    commonActions.populateInputAtIndex(commonLocators.lastNameInputField, contactLastName)
    commonActions.populateInputAtIndex(commonLocators.dateOfBirthInputField, "1990-01-01")
    commonActions.populateInputAtIndex(commonLocators.emailInputField, "contact@mail.com")
    commonActions.populateInputAtIndex(commonLocators.phoneInputField, "1234567890")
    commonActions.populateInputAtIndex(commonLocators.address1InputField, "test address 1")
    commonActions.populateInputAtIndex(commonLocators.address2InputField, "test address 2")
    commonActions.populateInputAtIndex(commonLocators.cityInputField, "New York")
    commonActions.populateInputAtIndex(commonLocators.stateInputField, "New York")
    commonActions.populateInputAtIndex(commonLocators.postalCodeInputField, "10001")
    commonActions.populateInputAtIndex(commonLocators.countryInputField, "United States")
    commonActions.clickElementAtIndex(commonLocators.submitBtn)
})

Cypress.Commands.add('editExistingContact', (contactFirstName, contactLastName) => {

    cy.wait(2000)
    commonActions.clickElementAtIndex(contactDetails.editContactBtn)
    commonActions.populateInputAtIndex(commonLocators.firstNameInputField, contactFirstName)
    commonActions.populateInputAtIndex(commonLocators.lastNameInputField, contactLastName)
    commonActions.populateInputAtIndex(commonLocators.dateOfBirthInputField, "1990-01-01")
    commonActions.populateInputAtIndex(commonLocators.emailInputField, "contact@mail.com")
    commonActions.populateInputAtIndex(commonLocators.phoneInputField, "1234567890")
    commonActions.populateInputAtIndex(commonLocators.address1InputField, "test address 1")
    commonActions.populateInputAtIndex(commonLocators.address2InputField, "test address 2")
    commonActions.populateInputAtIndex(commonLocators.cityInputField, "New York")
    commonActions.populateInputAtIndex(commonLocators.stateInputField, "New York")
    commonActions.populateInputAtIndex(commonLocators.postalCodeInputField, "10001")
    commonActions.populateInputAtIndex(commonLocators.countryInputField, "United States")
    commonActions.clickElementAtIndex(commonLocators.submitBtn)
})
