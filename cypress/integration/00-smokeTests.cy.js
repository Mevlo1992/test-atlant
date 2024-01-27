import { CommonActions } from "../support/utils/commonActions"
import { locatorTextData } from "../fixtures/constants"
import { CommonLocators } from "../support/utils/commonLocators"
import { textData } from "../fixtures/constants"
import { loginPageLocators } from "../pages/loginPage/loginPageLocators"

const commonActions = new CommonActions
const commonLocators = new CommonLocators
const loginLocators = new loginPageLocators

describe('Smoke tests', () => {
    beforeEach('addNewUser', () => {
        let email = generateRandomStringOfXChars(10) + "@mail.com"
        cy.addNewUser(email)
      })
})