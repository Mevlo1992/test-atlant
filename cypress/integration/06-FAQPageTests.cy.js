import { CommonActions } from "../support/utils/commonActions" 
import { locatorTextData } from "../fixtures/constants"
import { CommonLocators } from "../support/utils/commonLocators"
import { textData } from "../fixtures/constants"
import { alarmSettingsPageLocators} from "../pages/alarmSettingsPage/alarmSettingsPageLocators"
import { qase } from 'cypress-qase-reporter/dist/mocha';

const alarmSettingsLocators = new alarmSettingsPageLocators
const commonActions = new CommonActions
const commonLocators = new CommonLocators

describe('FAQ Page tests', () =>{
    beforeEach('Login on app', () => {
        cy.login(Cypress.env('email'), Cypress.env('password'))
        commonActions.clickElementContainingTextAtIndex(commonLocators.button, locatorTextData.alarmSettings)
    })
})
