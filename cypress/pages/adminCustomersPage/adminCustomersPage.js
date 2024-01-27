import { CommonActions } from "../../support/utils/commonActions"
import { CommonLocators } from "../../support/utils/commonLocators"
import { textData } from "../../fixtures/constants"
import { adminCustomersPageLocators } from "./adminCustomersPageLocators"

const commonActions = new CommonActions
const commonLocators = new CommonLocators
const customersPageLocators = new adminCustomersPageLocators

export class adminCustomersPage {
    populateAddNewCustomersForm(locator, value, index) {
        this.clearInputAtIndex(customersPageLocators.inputField, 0);
        cy.get(locator).eq(index).type(text);
        commonActions.populateInputAtIndex(customersPageLocators.inputField, value, 0)
        commonActions.populateInputAtIndex(customersPageLocators.inputField, randomUtils.generateRandomStringOfXChars(15), 1)
        commonActions.populateInputAtIndex(customersPageLocators.inputField, randomUtils.generateRandomStringOfXChars(15), 2)
        commonActions.populateInputAtIndex(customersPageLocators.inputField, randomUtils.generateRandomStringOfXChars(15), 3)
        commonActions.populateInputAtIndex(customersPageLocators.inputField, randomUtils.generateRandomStringOfXChars(15), 4)
        commonActions.populateInputAtIndex(customersPageLocators.inputField, randomUtils.generateRandomStringOfXChars(15), 5)
        commonActions.populateInputAtIndex(customersPageLocators.inputField, randomUtils.generateRandomStringOfXChars(15), 6)
        commonActions.populateInputAtIndex(customersPageLocators.inputField, randomUtils.generateRandomStringOfXChars(15), 7)
        commonActions.populateInputAtIndex(customersPageLocators.inputField, randomUtils.generateRandomStringOfXChars(15), 8)
        commonActions.clickElementAtIndex(customersPageLocators.partnerAffiliateField, 1)
        commonActions.clickElementContainingTextAtIndex(commonLocators.option, textData.adminCustomersPage.partner)
        commonActions.clickElementAtIndex(customersPageLocators.countryField, 2)
        commonActions.clickElementContainingTextAtIndex(commonLocators.option, textData.adminCustomersPage.country)
}

populateCustomerName(text)
{
    cy.get(customersPageLocators.inputField).eq(0).type(text)
}

populateStreet(text)
{
    cy.get(customersPageLocators.inputField).eq(1).type(text)
}
populateCity(text)
{
    cy.get(customersPageLocators.inputField).eq(2).type(text)
}
populateZipCode(text){
    cy.get(customersPageLocators.inputField).eq(3).type(text)
}
}