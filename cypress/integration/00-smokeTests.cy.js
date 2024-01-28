import { CommonActions } from "../support/utils/commonActions"
import { generateRandomStringOfXChars } from "../support/utils/randomUtils";
import { contactListPageLocators } from "../pages/contactListPage/contactListPageLocators";
import { contactDetailsPageLocators } from "../pages/contactDetailsPage/contactDetailsPageLocators";


const commonActions = new CommonActions
const contactLocators = new contactListPageLocators
const contactDetailsLocators = new contactDetailsPageLocators

describe('Smoke tests', () => {
    beforeEach('addNewUserAndLogin', () => {
        let email = generateRandomStringOfXChars(10) + "@mail.com"
        Cypress.env('email', email)
        cy.addNewUserAndLogin(email)
    })

    it('verify user can add contact', () => {
        let contactFirstName = 'first ' + generateRandomStringOfXChars(8);
        Cypress.env('firstName', contactFirstName)
        let contactLastName = 'last ' + generateRandomStringOfXChars(8);
        cy.addNewContact(contactFirstName, contactLastName)
        commonActions.clickElementAtIndex(contactLocators.firstContactNameCell)
        commonActions.checkElementContainingTextIsDisplayed(contactDetailsLocators.firstNameSpanField, contactFirstName)
        commonActions.checkElementContainingTextIsDisplayed(contactDetailsLocators.lastNameSpanField, contactLastName)

    })

    afterEach(() => {
        const contactFirstName = Cypress.env('firstName')
        const email = Cypress.env('email')
        if (contactFirstName) {
            cy.wait(2000)
            commonActions.clickElementAtIndex(contactDetailsLocators.deleteContactBtn)
            cy.wait(2000)
            commonActions.checkElementDoesNotExist(contactLocators.firstContactNameCell)
            let bearerToken;
            cy.request({
                method: 'POST',
                url: '/users/login',
                body: {
                    "email": email,
                    "password": Cypress.env('password')
                },
            }).then((response) => {
                expect(response.status).to.equal(200);
                bearerToken = response.body.token;
                cy.request({
                method: 'DELETE',
                url: '/users/me',
                headers: {
                    Authorization: `Bearer ${bearerToken}`,
                },
            }).then((response) => {
                expect(response.status).to.equal(200);
                cy.request({
                method: 'POST',
                url: 'users/login',
                body: {
                    "email": email,
                    "password": Cypress.env('password')
                },
                failOnStatusCode: false, // Allow the request to fail
            }).then((response) => {
                expect(response.status).to.equal(401); // Expect Unauthorized status
            });

        })
    })
}
})
})
