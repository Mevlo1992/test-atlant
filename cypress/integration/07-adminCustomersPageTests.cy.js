import { CommonActions } from "../support/utils/commonActions"
import { locatorTextData } from "../fixtures/constants"
import { CommonLocators } from "../support/utils/commonLocators"
import { textData } from "../fixtures/constants"
import { adminCustomersPage } from "../pages/adminCustomersPage/adminCustomersPage"
import { generateRandomStringOfXChars } from "../support/utils/randomUtils"
import { adminCustomersPageLocators } from "../pages/adminCustomersPage/adminCustomersPageLocators"
import { qase } from 'cypress-qase-reporter/dist/mocha';

const commonActions = new CommonActions
const commonLocators = new CommonLocators
const customersPageLocators = new adminCustomersPageLocators
const customersPage = new adminCustomersPage

describe('Admin Customers Page tests', () => {
    beforeEach('Login on app', () => {
        cy.login(Cypress.env('email'), Cypress.env('password'))
        commonActions.clickElementContainingTextAtIndex(commonLocators.button, locatorTextData.customers)
    })

    qase(16, it('Verify Admin user is able to add new customer', { tags: 'smoke' }, () => {
        let customerName = 'customer_' + generateRandomStringOfXChars(5)
        Cypress.env('customerName', customerName);
        cy.addNewCustomer(customerName)
        cy.reload();
        cy.wait(3000)
    }))

    qase(34, it('Verify Admin user can select a customer by clicking on the row', { tags: 'smoke' }, () => {
        let customerName = 'customer_' + generateRandomStringOfXChars(5)
        Cypress.env('customerName', customerName);
        cy.addNewCustomer(customerName)
        cy.reload();
        cy.wait(3000)
        commonActions.clickElementAtIndex(commonLocators.button, 0)
        commonActions.clickElementContainingTextAtIndex(commonLocators.option, customerName)
        commonActions.clickElementContainingTextAtIndex(customersPageLocators.customerNameCell, customerName)
    }))

    
    qase(35, it('Verify customer details are visible when admin user clicks on customer row', { tags: 'smoke' }, () => {
        let customerName = 'customer_' + generateRandomStringOfXChars(5)
        Cypress.env('customerName', customerName);
        cy.addNewCustomer(customerName)
        cy.reload();
        cy.wait(3000)
        commonActions.clickElementAtIndex(commonLocators.button, 0)
        commonActions.clickElementContainingTextAtIndex(commonLocators.option, customerName)
        commonActions.clickElementContainingTextAtIndex(customersPageLocators.customerNameCell, customerName)
        cy.get(customersPageLocators.inputField).eq(0).should('have.value', customerName)
    }))

    qase(36, it('Verify admin user can edit customer details', { tags: 'smoke' }, () => {
        let customerName = 'customer_' + generateRandomStringOfXChars(5)
        Cypress.env('customerName', customerName);
        cy.addNewCustomer(customerName)
        cy.reload();
        cy.wait(3000)
        commonActions.clickElementAtIndex(commonLocators.button, 0)
        commonActions.clickElementContainingTextAtIndex(commonLocators.option, customerName)
        commonActions.clickElementContainingTextAtIndex(customersPageLocators.customerNameCell, customerName)
        commonActions.clearInputAtIndex(customersPageLocators.inputField, 1)
        commonActions.clearInputAtIndex(customersPageLocators.inputField, 2)
        commonActions.populateInputAtIndex(customersPageLocators.inputField, 'newAddress_' + generateRandomStringOfXChars(5), 1)
        commonActions.populateInputAtIndex(customersPageLocators.inputField, 'newCity_' +generateRandomStringOfXChars(5), 2)
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