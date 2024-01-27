import { CommonActions } from "../support/utils/commonActions" 
import { locatorTextData } from "../fixtures/constants"
import { CommonLocators } from "../support/utils/commonLocators"
import { qase } from 'cypress-qase-reporter/dist/mocha';
import { dashboardPageLocators } from "../pages/dashboardPage/dashboardPageLocators";
import { textData } from "../fixtures/constants";

const commonActions = new CommonActions
const commonLocators = new CommonLocators
const dashboardLocators = new dashboardPageLocators


describe('Sensors Page tests', () =>{
    beforeEach('Login on app', () => {
        cy.login(Cypress.env('email'), Cypress.env('password'))
    })

    qase(13, it('Verify user is able to navigate to Sensors page successfully', { tags:'smoke' }, () => {
        cy.wait(2000)
        commonActions.clickElementContainingTextAtIndex(commonLocators.button, locatorTextData.sensors)
        cy.wait(2000)
        commonActions.clickElementAtIndex(dashboardLocators.buildingsDropdownBtn, 1)
        commonActions.clickElementContainingTextAtIndex(commonLocators.option, textData.dashboardPage.buildings.kita_building)
        cy.contains('Device Label').should('be.visible')
        cy.contains('Water meter sensor').should('be.visible')
        cy.contains('Floor sensor').should('be.visible')
    }))
})