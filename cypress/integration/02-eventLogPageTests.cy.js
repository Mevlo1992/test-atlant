import { CommonActions } from "../support/utils/commonActions" 
import { textData, locatorTextData } from "../fixtures/constants"
import { CommonLocators } from "../support/utils/commonLocators"
import { qase } from 'cypress-qase-reporter/dist/mocha';
import { EventLogPageLocators } from "../pages/eventLogPage/eventLogPageLocators";


const commonActions = new CommonActions
const commonLocators = new CommonLocators
const eventLogLocators = new EventLogPageLocators


describe('EventLog Page tests', () =>{
    beforeEach('Login on app', () => {
        cy.login(Cypress.env('email'), Cypress.env('password'))
    })

    qase(12, it('Verify user is able to navigate to Event Log page successfully', { tags:'smoke' }, () => {
        commonActions.clickElementContainingTextAtIndex(commonLocators.button, locatorTextData.eventLog)
        cy.contains('Buildings').should('be.visible')
        cy.contains('Event Log').should('be.visible')
    }))

    qase(42, it('Should verify all Buildings are visible in the selector', { tags:'regression' }, () => {
        cy.wait(2000)
        commonActions.clickElementContainingTextAtIndex(commonLocators.button, locatorTextData.dashboard)
        cy.wait(2000)
        commonActions.clickElementAtIndex(eventLogLocators.buildingsDropdownBtn, 1)
        commonActions.checkTextIsExisting(textData.dashboardPage.buildings.aaaa)
        commonActions.checkTextIsExisting(textData.dashboardPage.buildings.kita_building)
        commonActions.checkTextIsExisting(textData.dashboardPage.buildings.test2)
        commonActions.checkTextIsExisting(textData.dashboardPage.buildings.test2bug)
        commonActions.checkTextIsExisting(textData.dashboardPage.buildings.zipzap)
    }))
})