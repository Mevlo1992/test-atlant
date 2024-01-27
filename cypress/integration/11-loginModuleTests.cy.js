import { CommonActions } from "../support/utils/commonActions" 
import { locatorTextData } from "../fixtures/constants"
import { CommonLocators } from "../support/utils/commonLocators"
import { textData } from "../fixtures/constants"
import { alarmSettingsPageLocators} from "../pages/alarmSettingsPage/alarmSettingsPageLocators"
import { qase } from 'cypress-qase-reporter/dist/mocha';
import { loginModuleLocators } from "../pages/loginModule/loginModuleLocators"
import { generateRandomStringOfXChars } from "../support/utils/randomUtils"

const alarmSettingsLocators = new alarmSettingsPageLocators
const commonActions = new CommonActions
const commonLocators = new CommonLocators
const loginLocators = new loginModuleLocators

describe('Login module tests', () =>{
    beforeEach('Login on app', () => {
    
    })
    qase(43, it('Verify that the user cannot log in with invalid credentials', { tags: 'regression' }, () => {
        cy.visit('')
        commonActions.populateInputAtIndex(loginLocators.emailInputField, generateRandomStringOfXChars(5), 1)
        commonActions.populateInputAtIndex(loginLocators.passwordInputField, generateRandomStringOfXChars(5), 1)
        commonActions.clickElementAtIndex(loginLocators.signInBtn, 1)
        commonActions.clickElementAtIndex(loginLocators.loginErrorMessage, 1)
        }))
        
})
