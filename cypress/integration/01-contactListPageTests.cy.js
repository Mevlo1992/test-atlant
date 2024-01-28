import { CommonActions } from "../support/utils/commonActions" 
import { CommonLocators } from "../support/utils/commonLocators"
import { generateRandomStringOfXChars } from "../support/utils/randomUtils";
import { loginPageLocators } from "../pages/loginPage/loginPageLocators"
import { contactListPageLocators } from "../pages/contactListPage/contactListPageLocators";
import { contactDetailsPageLocators } from "../pages/contactDetailsPage/contactDetailsPageLocators";


const commonActions = new CommonActions
const loginLocators = new loginPageLocators
const commonLocators = new CommonLocators
const contactLocators = new contactListPageLocators
const contactDetailsLocators = new contactDetailsPageLocators

describe('Contact List Page tests', () =>{
    beforeEach('add New User And Login, then create contact', () => {
        let email = generateRandomStringOfXChars(10) + "@mail.com"
        cy.addNewUserAndLogin(email)
        let contactFirstName = 'first ' + generateRandomStringOfXChars(8);
        let contactLastName = 'last ' + generateRandomStringOfXChars(8);
        cy.addNewContact(contactFirstName, contactLastName)
      })

      it ('verify user can delete contact', ()=> {
        commonActions.clickElementAtIndex(contactLocators.firstContactNameCell)
        commonActions.clickElementAtIndex(contactDetailsLocators.deleteContactBtn)
        commonActions.checkElementDoesNotExist(contactLocators.firstContactNameCell)
      })

    it ('verify user can edit contact', ()=> {
        commonActions.clickElementAtIndex(contactLocators.firstContactNameCell)
        let contactFirstName = 'updated ' + generateRandomStringOfXChars(8);
        let contactLastName = 'updated ' + generateRandomStringOfXChars(8);
        cy.editExistingContact(contactFirstName, contactLastName)
        commonActions.checkElementContainingTextIsDisplayed(contactDetailsLocators.firstNameSpanField, contactFirstName)
        commonActions.checkElementContainingTextIsDisplayed(contactDetailsLocators.lastNameSpanField, contactLastName)
      })
    })
        