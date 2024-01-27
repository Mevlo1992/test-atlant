import { CommonActions } from "../support/utils/commonActions"
import { locatorTextData } from "../fixtures/constants"
import { CommonLocators } from "../support/utils/commonLocators"
import { overviewPageLocators } from "../pages/overviewPage/overviewPageLocators"
import { textData } from "../fixtures/constants"
import { qase } from 'cypress-qase-reporter/dist/mocha';
import { generateRandomNumberBetween, generateRandomStringOfXChars } from "../support/utils/randomUtils"
import { adminUsersPageLocators } from "../pages/adminUsersPage/adminUsersPageLocators"

const commonActions = new CommonActions
const commonLocators = new CommonLocators
const overviewPageLocator = new overviewPageLocators
const usersPageLocators = new adminUsersPageLocators
describe('Overview Page tests', () => {
    beforeEach('Login on app', () => {
        cy.login(Cypress.env('email'), Cypress.env('password'))
    })

    qase(1, it('Verify user is able to log in successfully', { tags: 'smoke' }, () => {
        cy.contains('Buildings').should('be.visible')
        cy.contains('Indicators').should('be.visible')
        cy.contains('Info').should('be.visible')
        cy.contains('Leak/Flood warning').should('be.visible')
    }))

    qase(3, it('Verify list of sensors button is routing user to Sensors page', { tags: 'smoke' }, () => {
        commonActions.clickElementAtIndex(overviewPageLocator.sensorsBtn)
        commonActions.checkTextIsExisting(textData.overviewPage.deviceLabel)
    }))

    qase(4, it('Verify Go To Dashboard button is routing user to Dashboard page', { tags: 'smoke' }, () => {
        commonActions.clickElementAtIndex(overviewPageLocator.routerBtn)
        commonActions.checkElementContainingTextIsDisplayed(commonLocators.button, textData.dashboardPage.metrics)
    }))

    qase(5, it('Verify Alarm recipients button is routing user to Alarm settings page', { tags: 'regression' }, () => {
        cy.wait(2000)
        commonActions.clickElementContainingTextAtIndex(commonLocators.typeButton, locatorTextData.alarmRecipients)
        commonActions.checkTextIsExisting(textData.alarmSettingsPage.alarmRecipient)
    }))
    qase(6, it('Verify all buildings under the customer are visible in Overview page', { tags: 'smoke' }, () => {
        // step1 - create customer
        // step2 - create device and new sensor set
        // step3 - create new building and assign to customer
        // step4 - logout
        // step5 - log in with customer user
        // step6 - verify building with {{buildingName}} is displayed on overview page
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
        commonActions.clickElementContainingTextAtIndex(commonLocators.button, locatorTextData.users)
        commonActions.populateInputAtIndex(commonLocators.searchInput, "Customer_User")
        cy.wait(1000)
        commonActions.clickElementContainingTextAtIndex(usersPageLocators.userCell, "Customer_User")
        cy.wait(2000)
        commonActions.clickElementAtIndex(usersPageLocators.inputField, 2)
        commonActions.clickElementContainingTextAtIndex(commonLocators.option, customerName)
        commonActions.clickElementContainingTextAtIndex(commonLocators.typeButton, locatorTextData.save)
        cy.logout()
        cy.login(Cypress.env('customerUserEmail'), Cypress.env('password'))
        cy.wait(3000)
        commonActions.checkElementContainingTextIsDisplayed(usersPageLocators.userCell, buildingName)
        cy.logout()
        cy.login(Cypress.env('email'), Cypress.env('password'))
    }))
    afterEach(() => {
        const buildingName = Cypress.env('buildingName');
        const customerName = Cypress.env('customerName');
        if (buildingName) {
            cy.reload();
            cy.wait(3000)
            commonActions.clickElementAtIndex(commonLocators.button, 0)
            commonActions.clickElementContainingTextAtIndex(commonLocators.option, customerName)
            commonActions.clickElementContainingTextAtIndex(commonLocators.button, locatorTextData.buildings)
            cy.deleteBuilding(buildingName)
        }
        if (customerName) {
            cy.reload()
            commonActions.clickElementContainingTextAtIndex(commonLocators.button, locatorTextData.users)
            commonActions.populateInputAtIndex(commonLocators.searchInput, "Customer_User")
            cy.wait(1000)
            commonActions.clickElementContainingTextAtIndex(usersPageLocators.userCell, "Customer_User")
            cy.wait(2000)
            commonActions.clickElementAtIndex(usersPageLocators.inputField, 2)
            commonActions.clickElementContainingTextAtIndex(commonLocators.option, 'Case de Neha')
            cy.wait(3000)
            commonActions.clickElementContainingTextAtIndex(commonLocators.typeButton, locatorTextData.save)
            cy.wait(2000)
            commonActions.clickElementContainingTextAtIndex(commonLocators.button, locatorTextData.customers)
            cy.deleteCustomer(customerName)
        }
    })
    
})