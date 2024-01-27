import { CommonActions } from "../support/utils/commonActions" 
import { locatorTextData } from "../fixtures/constants"
import { CommonLocators } from "../support/utils/commonLocators"
import { textData } from "../fixtures/constants"
import { generateRandomStringOfXChars } from "../support/utils/randomUtils";

const commonActions = new CommonActions
const commonLocators = new CommonLocators
const dashboardLocators = new dashboardPageLocators

describe('Contact List Page tests', () =>{
    beforeEach('addNewUserAndLogin', () => {
        let email = generateRandomStringOfXChars(10) + "@mail.com"
        cy.addNewUser(email)
      })

      it ('verify user can add contact', ()=> {
        let contactLastName = generateRandomStringOfXChars(8)
        cy.addNewContact()
        commonActions.checkElementContainingTextExists()

      })
    })
        