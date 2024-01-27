import { CommonActions } from "../support/utils/commonActions"
import { locatorTextData } from "../fixtures/constants"
import { CommonLocators } from "../support/utils/commonLocators"
import { textData } from "../fixtures/constants"
import { alarmSettingsPageLocators } from "../pages/alarmSettingsPage/alarmSettingsPageLocators"
import { qase } from 'cypress-qase-reporter/dist/mocha';
import { generateRandomStringOfXChars, getRandomLargeNumberOfXChars } from "../support/utils/randomUtils"

const alarmSettingsLocators = new alarmSettingsPageLocators
const commonActions = new CommonActions
const commonLocators = new CommonLocators

describe('Alarm Settings Page tests', () => {
    beforeEach('Login on app', () => {
        cy.login(Cypress.env('email'), Cypress.env('password'))
    })

    qase(15, it('Verify user is able to add new Alarm recipient', { tags: 'smoke' }, () => {
        commonActions.clickElementContainingTextAtIndex(commonLocators.button, locatorTextData.alarmSettings)
        let alarmRecipientName = 'alarm_recipient_' + generateRandomStringOfXChars(5)
        Cypress.env('alarmRecipientName', alarmRecipientName);
        cy.addNewAlarmRecipient(alarmRecipientName)
        commonActions.checkElementContainingTextIsDisplayed(alarmSettingsLocators.alarmRecipientNameCell, alarmRecipientName)

    }))

    qase(37, it('Verify user can edit existing Alarm recipient', { tags: 'smoke' }, () => {
        commonActions.clickElementContainingTextAtIndex(commonLocators.button, locatorTextData.alarmSettings)
        let alarmRecipientName = 'alarm_recipient_' + generateRandomStringOfXChars(5)
        let alarmRecipientRole = textData.alarmSettingsPage.hausmeister
        Cypress.env('alarmRecipientName', alarmRecipientName);alarmRecipientRole
        cy.addNewAlarmRecipient(alarmRecipientName)
        commonActions.checkElementContainingTextIsDisplayed(alarmSettingsLocators.alarmRecipientNameCell, alarmRecipientName)
        commonActions.clickElementContainingTextAtIndex(alarmSettingsLocators.alarmRecipientNameCell, alarmRecipientName)
        const updatedAlarmRecipientRole = textData.alarmSettingsPage.verwalterin
        commonActions.clickElementAtIndex(alarmSettingsLocators.buildingField, 0)
        commonActions.clearInputAtIndex(alarmSettingsLocators.inputField, 3)
        commonActions.clickElementContainingTextAtIndex(commonLocators.option, updatedAlarmRecipientRole)
        cy.wait(2000)
        commonActions.clickElementContainingTextAtIndex(commonLocators.typeButton, locatorTextData.save)
        commonActions.populateInputAtIndex(commonLocators.searchInput, alarmRecipientName)
        commonActions.checkElementContainingTextIsDisplayed(alarmSettingsLocators.alarmRecipientNameCell, updatedAlarmRecipientRole)

        }))
    afterEach(() => {
        const alarmRecipientName = Cypress.env('alarmRecipientName');
        if(alarmRecipientName)
        {
        commonActions.clickElementContainingTextAtIndex(commonLocators.button, locatorTextData.alarmSettings)
        cy.deleteAlarmRecipient(alarmRecipientName)
        }
    })
})
