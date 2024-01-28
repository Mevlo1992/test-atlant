import { CommonActions } from "../support/utils/commonActions" 
import { CommonLocators } from "../support/utils/commonLocators"
import { generateRandomStringOfXChars } from "../support/utils/randomUtils"
import { loginPageLocators } from "../pages/loginPage/loginPageLocators"

const commonActions = new CommonActions
const commonLocators = new CommonLocators
const loginLocators = new loginPageLocators


describe('Login page tests', () =>{
    beforeEach('addNewUser', () => {
      let email = generateRandomStringOfXChars(10) + "@mail.com"
      cy.addNewUser(email)
    })



    it('Verify that the user cannot log in with invalid credentials', () => {
        cy.visit('')
        commonActions.populateInputAtIndex(loginLocators.emailInputField, generateRandomStringOfXChars(5))
        commonActions.populateInputAtIndex(loginLocators.passwordInputField, generateRandomStringOfXChars(7))
        commonActions.clickElementAtIndex(commonLocators.submitBtn)
        commonActions.checkElementTextAtIndex(loginLocators.errorMessage, "Incorrect username or password")
        })
    })
        
