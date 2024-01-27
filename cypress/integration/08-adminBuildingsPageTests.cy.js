import { CommonActions } from "../support/utils/commonActions"
import { locatorTextData } from "../fixtures/constants"
import { CommonLocators } from "../support/utils/commonLocators"
import { textData } from "../fixtures/constants"
import { adminBuildingsPageLocators } from "../pages/adminBuildingsPage/adminBuildingsPageLocators"
import { adminCustomersPageLocators } from "../pages/adminCustomersPage/adminCustomersPageLocators"
import { adminSensorsPageLocators } from "../pages/adminSensorsPage/adminSensorsPageLocators"
import { generateRandomStringOfXChars } from "../support/utils/randomUtils"
import { qase } from 'cypress-qase-reporter/dist/mocha';

const commonActions = new CommonActions
const commonLocators = new CommonLocators
const customersPageLocators = new adminCustomersPageLocators
const buildingsPageLocators = new adminBuildingsPageLocators
const sensorsPageLocators = new adminSensorsPageLocators

describe('Admin Buildings Page tests', () => {
    beforeEach('Login on app', () => {
        cy.login(Cypress.env('email'), Cypress.env('password'))
    })
    qase(18, it('Verify Admin user is able to add new building', { tags: 'smoke' }, () => {
        let customerName = 'customer_' + generateRandomStringOfXChars(5)
        let buildingName = 'building_' + generateRandomStringOfXChars(5)
        Cypress.env('buildingName', buildingName);
        Cypress.env('customerName', customerName);
        cy.addNewCustomer(customerName)
        cy.reload();
        cy.wait(3000)
        commonActions.clickElementAtIndex(commonLocators.button, 0)
        commonActions.clickElementContainingTextAtIndex(commonLocators.option, customerName)
        cy.addNewBuildingWithoutSensor(buildingName, customerName)
    }))

    qase(30, it('Verify Admin user can select a building by clicking on the row', { tags: 'smoke' }, () => {
        let customerName = 'customer_' + generateRandomStringOfXChars(5)
        let buildingName = 'building_' + generateRandomStringOfXChars(5)
        Cypress.env('buildingName', buildingName);
        Cypress.env('customerName', customerName);
        cy.addNewCustomer(customerName)
        cy.reload();
        cy.wait(3000)
        commonActions.clickElementAtIndex(commonLocators.button, 0)
        commonActions.clickElementContainingTextAtIndex(commonLocators.option, customerName)
        cy.addNewBuildingWithoutSensor(buildingName, customerName)
        commonActions.clickElementContainingTextAtIndex(buildingsPageLocators.buildingNameCell, buildingName)
    }))

    
    qase(31, it('Verify building details are visible when admin user clicks on building row', { tags: 'smoke' }, () => {
        let customerName = 'customer_' + generateRandomStringOfXChars(5)
        let buildingName = 'building_' + generateRandomStringOfXChars(5)
        Cypress.env('buildingName', buildingName);
        Cypress.env('customerName', customerName);
        cy.addNewCustomer(customerName)
        cy.reload();
        cy.wait(3000)
        commonActions.clickElementAtIndex(commonLocators.button, 0)
        commonActions.clickElementContainingTextAtIndex(commonLocators.option, customerName)
        cy.addNewBuildingWithoutSensor(buildingName, customerName)
        commonActions.clickElementContainingTextAtIndex(buildingsPageLocators.buildingNameCell, buildingName)
        cy.get(buildingsPageLocators.buildingNameField).invoke('val').should('eq', buildingName);  
        commonActions.clickElementAtIndex(commonLocators.button, 14)
        cy.get('ul[role="listbox"]').should('contain', customerName)
    }))

    qase(32, it('Verify admin user can edit building details', { tags: 'smoke' }, () => {
        let customerName = 'customer_' + generateRandomStringOfXChars(5)
        let buildingName = 'building_' + generateRandomStringOfXChars(5)
        Cypress.env('buildingName', buildingName);
        Cypress.env('customerName', customerName);
        cy.addNewCustomer(customerName)
        cy.reload();
        cy.wait(3000)
        commonActions.clickElementAtIndex(commonLocators.button, 0)
        commonActions.clickElementContainingTextAtIndex(commonLocators.option, customerName)
        cy.addNewBuildingWithoutSensor(buildingName, customerName)
        commonActions.clickElementContainingTextAtIndex(buildingsPageLocators.buildingNameCell, buildingName)
        commonActions.clearInputAtIndex(buildingsPageLocators.buildingNameField, 1)
        commonActions.clearInputAtIndex(buildingsPageLocators.buildingNameField, 2)
        commonActions.populateInputAtIndex(buildingsPageLocators.buildingNameField, 'newAddress_' + generateRandomStringOfXChars(5), 1)
        commonActions.populateInputAtIndex(buildingsPageLocators.buildingNameField, 'newCity_' +generateRandomStringOfXChars(5), 2)
        commonActions.clickElementContainingTextAtIndex(commonLocators.typeButton, locatorTextData.save)
    }))

    qase(33, it('Verify admin user can assign and remove sensor set on created building', { tags: 'smoke' }, () => {
        let customerName = 'customer_' + generateRandomStringOfXChars(5)
        let buildingName = 'building_' + generateRandomStringOfXChars(5)
        Cypress.env('buildingName', buildingName);
        Cypress.env('customerName', customerName);
        cy.addNewCustomer(customerName)
        cy.reload();
        cy.wait(3000)
        commonActions.clickElementAtIndex(commonLocators.button, 0)
        commonActions.clickElementContainingTextAtIndex(commonLocators.option, customerName)
        cy.addNewBuildingWithSensor(buildingName, customerName)
        commonActions.clickElementContainingTextAtIndex(buildingsPageLocators.buildingNameCell, buildingName)
        cy.wait(5000)
        commonActions.clickElementAtIndex(buildingsPageLocators.removeSensorSetIcon)
        commonActions.checkElementTextAtIndex(commonLocators.notiSnackbarText, 'Sensor set successfully detached from building')
        commonActions.clickElementContainingTextAtIndex(commonLocators.typeButton, locatorTextData.save)
    }))

    
    afterEach(() => {
        const buildingName = Cypress.env('buildingName');
        const customerName = Cypress.env('customerName');
        if(buildingName)
        {
        commonActions.clickElementContainingTextAtIndex(commonLocators.button, locatorTextData.buildings)
        cy.deleteBuilding(buildingName)
        }
        if (customerName)
        {
        commonActions.clickElementContainingTextAtIndex(commonLocators.button, locatorTextData.customers)
        cy.deleteCustomer(customerName)
        }
    })
})
