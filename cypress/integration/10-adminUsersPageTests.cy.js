import { CommonActions } from "../support/utils/commonActions"
import { locatorTextData } from "../fixtures/constants"
import { CommonLocators } from "../support/utils/commonLocators"
import { textData } from "../fixtures/constants"
import { generateRandomStringOfXChars } from "../support/utils/randomUtils"
import { alarmSettingsPageLocators } from "../pages/alarmSettingsPage/alarmSettingsPageLocators"
import { qase } from 'cypress-qase-reporter/dist/mocha';
import { adminUsersPageLocators } from "../pages/adminUsersPage/adminUsersPageLocators"

const alarmSettingsLocators = new alarmSettingsPageLocators
const commonActions = new CommonActions
const commonLocators = new CommonLocators
const usersLocators = new adminUsersPageLocators

describe('Admin Users Page tests', () => {
    beforeEach('Login on app', () => {
        cy.login(Cypress.env('email'), Cypress.env('password'))
        commonActions.clickElementContainingTextAtIndex(commonLocators.button, locatorTextData.alarmSettings)
    })

    qase(44, it('Verify Admin User can add user', { tags: 'smoke' }, () => {
        commonActions.clickElementContainingTextAtIndex(commonLocators.button, locatorTextData.users)
        let userName = 'user_' + generateRandomStringOfXChars(5)
        Cypress.env('userName', userName);
        cy.addNewUser(userName)
    }))


    afterEach(() => {
        const userName = Cypress.env('userName');
        if (userName) {
            commonActions.clickElementContainingTextAtIndex(commonLocators.button, locatorTextData.users)
            cy.deleteUser(userName)
        }
    })
})
