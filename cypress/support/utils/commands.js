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
import { CommonLocators } from "./commonLocators"
import { adminCustomersPageLocators } from "../../pages/adminCustomersPage/adminCustomersPageLocators"
import { adminBuildingsPageLocators } from "../../pages/adminBuildingsPage/adminBuildingsPageLocators"
import { adminSensorsPageLocators } from "../../pages/adminSensorsPage/adminSensorsPageLocators"
import { textData } from "../../fixtures/constants"
import { locatorTextData } from "../../fixtures/constants"
import { generateRandomStringOfXChars, getRandomLargeNumberOfXChars } from "./randomUtils"
import { alarmSettingsPageLocators } from "../../pages/alarmSettingsPage/alarmSettingsPageLocators"
import { adminUsersPageLocators } from "../../pages/adminUsersPage/adminUsersPageLocators"

const alarmSettingsLocators = new alarmSettingsPageLocators
const customersPageLocators = new adminCustomersPageLocators
const buildingsPageLocators = new adminBuildingsPageLocators
const sensorsPageLocators = new adminSensorsPageLocators
const commonActions = new CommonActions
const commonLocators = new CommonLocators
const usersPageLocators = new adminUsersPageLocators


let emailInputField = e => cy.get('input[id="signInFormUsername"]').eq(1)
let passwordInputField = e => cy.get('input[id="signInFormPassword"]').eq(1)
let signInBtn = e => cy.get('input[name="signInSubmitButton"]').eq(1)
let userButton = e => cy.get('button[type="button"]').eq(1)
let logoutButton = e => cy.get('ul[role="menu"]')


Cypress.Commands.add('login', (username, password) => {
    cy.visit('')
    emailInputField().type(username)
    passwordInputField().type(password)
    signInBtn().click()
})

Cypress.Commands.add('logout', () => {
    userButton().click()
    logoutButton().click()
})
Cypress.Commands.add('addNewAlarmRecipient', (alarmRecipientName) => {
    commonActions.clickElementContainingTextAtIndex(commonLocators.button, locatorTextData.alarmSettings)
    commonActions.clickElementContainingTextAtIndex(commonLocators.typeButton, textData.alarmSettingsPage.newRecipient)
    commonActions.populateInputAtIndex(alarmSettingsLocators.inputField, alarmRecipientName, 0)
    commonActions.populateInputAtIndex(alarmSettingsLocators.inputField, parseInt('49') + getRandomLargeNumberOfXChars(9), 1)
    commonActions.populateInputAtIndex(alarmSettingsLocators.inputField, generateRandomStringOfXChars(5), 2)
    commonActions.clickElementAtIndex(alarmSettingsLocators.inputField, 3)
    commonActions.clickElementContainingTextAtIndex(commonLocators.option, textData.alarmSettingsPage.hausmeister)
    commonActions.clickElementAtIndex(alarmSettingsLocators.buildingField, 1)
    commonActions.clickElementAtIndex(commonLocators.option, 1)
    commonActions.clickElementAtIndex(commonLocators.checkbox, 0)
    commonActions.clickElementAtIndex(commonLocators.checkbox, 1)
    commonActions.populateInputAtIndex(alarmSettingsLocators.timeFields, "09:00", 0)
    commonActions.populateInputAtIndex(alarmSettingsLocators.timeFields, "23:00", 1)
    commonActions.clickElementAtIndex(commonLocators.checkbox, 2)
    commonActions.clickElementContainingTextAtIndex(commonLocators.typeButton, locatorTextData.save)
    commonActions.populateInputAtIndex(commonLocators.searchInput, alarmRecipientName)
    commonActions.checkElementContainingTextIsDisplayed(alarmSettingsLocators.alarmRecipientNameCell, alarmRecipientName)
})

Cypress.Commands.add('addNewCustomer', (customerName) => {
    cy.wait(3000)
    commonActions.clickElementContainingTextAtIndex(commonLocators.button, locatorTextData.customers)
    commonActions.clickElementContainingTextAtIndex(commonLocators.typeButton, textData.adminCustomersPage.addNewCustomer)
    commonActions.populateInputAtIndex(customersPageLocators.inputField, customerName, 0)
    commonActions.populateInputAtIndex(customersPageLocators.inputField, 'Address_' + generateRandomStringOfXChars(5), 1)
    commonActions.populateInputAtIndex(customersPageLocators.inputField, 'City_' +generateRandomStringOfXChars(5), 2)
    commonActions.populateInputAtIndex(customersPageLocators.inputField, getRandomLargeNumberOfXChars(5), 3)
    commonActions.populateInputAtIndex(customersPageLocators.inputField, 'FirstName_' +generateRandomStringOfXChars(5), 4)
    commonActions.populateInputAtIndex(customersPageLocators.inputField, 'LastName_' +generateRandomStringOfXChars(5), 5)
    commonActions.populateInputAtIndex(customersPageLocators.inputField, generateRandomStringOfXChars(5) + '@gmail.com', 6)
    commonActions.populateInputAtIndex(customersPageLocators.inputField, parseInt('49') + getRandomLargeNumberOfXChars(9), 7)
    commonActions.populateInputAtIndex(customersPageLocators.inputField, 'www.' + generateRandomStringOfXChars(10) + '.com', 8)
    commonActions.clickElementAtIndex(customersPageLocators.partnerAffiliateField, 1)
    commonActions.clickElementContainingTextAtIndex(commonLocators.option, textData.adminCustomersPage.partner)
    commonActions.clickElementAtIndex(customersPageLocators.countryField, 2)
    commonActions.clickElementContainingTextAtIndex(commonLocators.option, textData.adminCustomersPage.country)
    commonActions.clickElementContainingTextAtIndex(commonLocators.typeButton, locatorTextData.save)
    commonActions.populateInputAtIndex(commonLocators.searchInput, customerName)
    cy.wait(3000)
    commonActions.checkElementContainingTextIsDisplayed(customersPageLocators.customerNameCell, customerName)
})

Cypress.Commands.add('addNewBuildingWithoutSensor', (buildingName, customerName) => {
    commonActions.clickElementContainingTextAtIndex(commonLocators.button, locatorTextData.buildings)
    commonActions.clickElementContainingTextAtIndex(commonLocators.typeButton, textData.adminBuildingsPage.addNewBuilding)
    commonActions.populateInputAtIndex(buildingsPageLocators.buildingNameField, buildingName, 0)
    commonActions.populateInputAtIndex(buildingsPageLocators.buildingNameField, 'Address_' + generateRandomStringOfXChars(5), 1)
    commonActions.populateInputAtIndex(buildingsPageLocators.buildingNameField, 'City_' +generateRandomStringOfXChars(5), 2)
    commonActions.populateInputAtIndex(buildingsPageLocators.buildingNameField, getRandomLargeNumberOfXChars(5), 3)
    commonActions.populateInputAtIndex(buildingsPageLocators.buildingNameField, 'Country_' +generateRandomStringOfXChars(5), 4)
    commonActions.clickElementAtIndex(commonLocators.button, 14)
    commonActions.clickElementContainingTextAtIndex(commonLocators.option, customerName)
    commonActions.clickElementAtIndex(commonLocators.button, 15)
    commonActions.clickElementContainingTextAtIndex(commonLocators.option, textData.adminBuildingsPage.gemeindezentrum)
    commonActions.clickElementContainingTextAtIndex(commonLocators.typeButton, locatorTextData.save)
    commonActions.populateInputAtIndex(commonLocators.searchInput, buildingName)
    cy.wait(3000)
    commonActions.checkElementContainingTextIsDisplayed(buildingsPageLocators.buildingNameCell, buildingName)
})

Cypress.Commands.add('addNewBuildingWithSensor', (buildingName, customerName) => {
    commonActions.clickElementContainingTextAtIndex(commonLocators.button, locatorTextData.buildings)
    commonActions.clickElementContainingTextAtIndex(commonLocators.typeButton, textData.adminBuildingsPage.addNewBuilding)
    commonActions.populateInputAtIndex(buildingsPageLocators.buildingNameField, buildingName, 0)
    commonActions.populateInputAtIndex(buildingsPageLocators.buildingNameField, 'Address_' + generateRandomStringOfXChars(5), 1)
    commonActions.populateInputAtIndex(buildingsPageLocators.buildingNameField, 'City_' +generateRandomStringOfXChars(5), 2)
    commonActions.populateInputAtIndex(buildingsPageLocators.buildingNameField, getRandomLargeNumberOfXChars(5), 3)
    commonActions.populateInputAtIndex(buildingsPageLocators.buildingNameField, 'Country_' +generateRandomStringOfXChars(5), 4)
    commonActions.clickElementAtIndex(commonLocators.button, 14)
    commonActions.clickElementContainingTextAtIndex(commonLocators.option, customerName)
    commonActions.clickElementAtIndex(commonLocators.button, 15)
    commonActions.clickElementContainingTextAtIndex(commonLocators.option, textData.adminBuildingsPage.gemeindezentrum)
    commonActions.clickElementAtIndex(buildingsPageLocators.sensorSetField)
    commonActions.clickElementAtIndex(commonLocators.option, 0)
    commonActions.clickElementContainingTextAtIndex(commonLocators.typeButton, locatorTextData.save)
    commonActions.populateInputAtIndex(commonLocators.searchInput, buildingName)
    cy.wait(3000)
    commonActions.checkElementContainingTextIsDisplayed(buildingsPageLocators.buildingNameCell, buildingName)
})

Cypress.Commands.add('addNewDeviceAndSensorSet', (deviceType, serialNumber, sensorSetId, assignedStatus = 0) => {
    //Create sensor
    commonActions.clickElementContainingTextAtIndex(commonLocators.typeButton, textData.adminDevicesPage.addNewDevice)
    commonActions.clickElementAtIndex(sensorsPageLocators.deviceTypeDropdown, 0)
    commonActions.clickElementContainingTextAtIndex(commonLocators.option, deviceType)
    commonActions.populateInputAtIndex(sensorsPageLocators.serialNumberField, serialNumber)
    if (deviceType === 'Floor sensor') {
        commonActions.populateInputAtIndex(sensorsPageLocators.devEUIField, generateRandomStringOfXChars(16))
        commonActions.populateInputAtIndex(sensorsPageLocators.appEUIField, generateRandomStringOfXChars(16))
        commonActions.populateInputAtIndex(sensorsPageLocators.appKeyField, generateRandomStringOfXChars(32))
    }
    commonActions.clickElementContainingTextAtIndex(commonLocators.typeButton, locatorTextData.save)

    if (assignedStatus === 1) {
        commonActions.populateInputAtIndex(commonLocators.searchInput, serialNumber)
        cy.wait(3000)
        commonActions.clickElementAtIndex(commonLocators.checkbox)
        commonActions.clickElementContainingTextAtIndex(commonLocators.typeButton, textData.adminDevicesPage.actions)
        commonActions.clickElementContainingTextAtIndex(sensorsPageLocators.deviceActionsOptions, textData.adminDevicesPage.createNewSet)
        cy.get(commonLocators.notiSnackbarText).invoke('text').then((text) => {
            const words = text.split(' ');
            sensorSetId = words[words.length - 1];
        })
    }

})


Cypress.Commands.add('addNewUser', (userName) => {
    cy.wait(3000)
    commonActions.clickElementContainingTextAtIndex(commonLocators.button, locatorTextData.users)
    commonActions.clickElementContainingTextAtIndex(commonLocators.typeButton, textData.adminUsersPage.createNewUser)
    commonActions.clickElementAtIndex(usersPageLocators.dropdownField, 1)
    commonActions.clickElementContainingTextAtIndex(commonLocators.option, textData.adminCustomersPage.partner)
    commonActions.clickElementAtIndex(usersPageLocators.dropdownField, 2)
    commonActions.clickElementContainingTextAtIndex(commonLocators.option, 'Case de Neha')
    commonActions.clickElementAtIndex(usersPageLocators.dropdownField, 3)
    commonActions.clickElementContainingTextAtIndex(commonLocators.option, textData.adminUsersPage.customerUser)
    commonActions.clickElementAtIndex(usersPageLocators.inputField, 3)
    commonActions.clickElementContainingTextAtIndex(commonLocators.option, locatorTextData.kita_building)
    commonActions.populateInputAtIndex(usersPageLocators.inputField, userName, 5)
    commonActions.populateInputAtIndex(usersPageLocators.inputField, 'LastName_' +generateRandomStringOfXChars(5), 6)
    commonActions.populateInputAtIndex(usersPageLocators.inputField, generateRandomStringOfXChars(5) + '@gmail.com', 7)
    commonActions.populateInputAtIndex(usersPageLocators.inputField, parseInt('49') + getRandomLargeNumberOfXChars(9), 8)
    commonActions.clickElementContainingTextAtIndex(commonLocators.typeButton, locatorTextData.save)
    commonActions.populateInputAtIndex(commonLocators.searchInput, userName)
    cy.wait(3000)
    commonActions.checkElementContainingTextIsDisplayed(usersPageLocators.userNameCell, userName)
})

Cypress.Commands.add('deleteBuilding', (buildingName) => {
    commonActions.populateInputAtIndex(commonLocators.searchInput, buildingName)
    cy.wait(2000)
    commonActions.clickElementContainingTextAtIndex(buildingsPageLocators.buildingNameCell, buildingName)
    commonActions.clickElementContainingTextAtIndex(commonLocators.typeButton, textData.adminBuildingsPage.deleteBuilding)
    commonActions.clickElementContainingTextAtIndex(commonLocators.typeButton, locatorTextData.confirm)
    commonActions.clickElementContainingTextAtIndex(commonLocators.typeButton, locatorTextData.continue)
    cy.wait (2000)

})

Cypress.Commands.add('deleteCustomer', (customerName) => {
    commonActions.populateInputAtIndex(commonLocators.searchInput, customerName)
    cy.wait(2000)
    commonActions.clickElementContainingTextAtIndex(customersPageLocators.customerNameCell, customerName)
    commonActions.clickElementContainingTextAtIndex(commonLocators.typeButton, textData.adminCustomersPage.deleteCustomer)
    commonActions.clickElementContainingTextAtIndex(commonLocators.typeButton, locatorTextData.confirm)
    commonActions.clickElementContainingTextAtIndex(commonLocators.typeButton, locatorTextData.continue)

})

Cypress.Commands.add('deleteUser', (userName) => {
    commonActions.populateInputAtIndex(commonLocators.searchInput, userName)
    cy.wait(2000)
    commonActions.clickElementContainingTextAtIndex(usersPageLocators.userCell, userName)
    commonActions.clickElementContainingTextAtIndex(commonLocators.typeButton, textData.adminUsersPage.deleteUser)
    commonActions.clickElementContainingTextAtIndex(commonLocators.typeButton, locatorTextData.confirm)
    commonActions.clickElementContainingTextAtIndex(commonLocators.typeButton, locatorTextData.continue)
}) 

Cypress.Commands.add('deleteDevice', (serialNumber) => {
    commonActions.populateInputAtIndex(commonLocators.searchInput, serialNumber)
    cy.wait(2000)
    commonActions.clickElementAtIndex(commonLocators.checkbox)
    commonActions.clickElementContainingTextAtIndex(commonLocators.typeButton, textData.adminDevicesPage.actions)
    commonActions.clickElementContainingTextAtIndex(sensorsPageLocators.deviceActionsOptions, textData.adminDevicesPage.unassignFromSet)
    cy.reload()
    commonActions.clickElementContainingTextAtIndex(commonLocators.button, locatorTextData.dashboard)
    commonActions.clickElementContainingTextAtIndex(commonLocators.button, locatorTextData.sensors, 1)
    commonActions.clickElementContainingTextAtIndex(commonLocators.button, locatorTextData.devices)
    commonActions.populateInputAtIndex(commonLocators.searchInput, serialNumber)
    cy.wait(2000)
    commonActions.clickElementAtIndex(commonLocators.checkbox)
    commonActions.clickElementContainingTextAtIndex(commonLocators.typeButton, textData.adminDevicesPage.actions)
    commonActions.clickElementContainingTextAtIndex(sensorsPageLocators.deviceActionsOptions, textData.adminDevicesPage.deleteDevice)
    commonActions.clickElementContainingTextAtIndex(commonLocators.typeButton, textData.adminDevicesPage.delete)
    commonActions.clickElementContainingTextAtIndex(commonLocators.typeButton, textData.adminDevicesPage.delete)

})

Cypress.Commands.add('deleteAlarmRecipient', (alarmRecipientName) => {
    commonActions.populateInputAtIndex(commonLocators.searchInput, alarmRecipientName)
    cy.wait(2000)
    commonActions.clickElementContainingTextAtIndex(alarmSettingsLocators.alarmRecipientNameCell, alarmRecipientName)
    commonActions.clickElementContainingTextAtIndex(commonLocators.typeButton, textData.alarmSettingsPage.delete)
    commonActions.clickElementContainingTextAtIndex(commonLocators.typeButton, locatorTextData.confirm)
    commonActions.clickElementContainingTextAtIndex(commonLocators.typeButton, textData.alarmSettingsPage.proceed)
})
