import { CommonActions } from "../support/utils/commonActions" 
import { locatorTextData } from "../fixtures/constants"
import { CommonLocators } from "../support/utils/commonLocators"
import { qase } from 'cypress-qase-reporter/dist/mocha';

const commonActions = new CommonActions
const commonLocators = new CommonLocators


describe('Account Page tests', () =>{
    beforeEach('Login on app', () => {
        cy.login(Cypress.env('email'), Cypress.env('password'))
    })

    qase(14, it('Verify user is able to navigate to Account page successfully', { tags:'smoke' }, () => {
        cy.wait(2000)
        commonActions.clickElementContainingTextAtIndex(commonLocators.button, locatorTextData.account)
        cy.wait(2000)
        cy.contains('User Details').should('be.visible')
    }))

})