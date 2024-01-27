import { CommonActions } from "../support/utils/commonActions" 
import { locatorTextData } from "../fixtures/constants"
import { CommonLocators } from "../support/utils/commonLocators"
import { textData } from "../fixtures/constants"
import { qase } from 'cypress-qase-reporter/dist/mocha';
import { dashboardPageLocators } from "../pages/dashboardPage/dashboardPageLocators";

const commonActions = new CommonActions
const commonLocators = new CommonLocators
const dashboardLocators = new dashboardPageLocators

describe('Dashboard Page tests', () =>{
    beforeEach('Login on app and choose dashboard', () => {
        cy.login(Cypress.env('email'), Cypress.env('password'))
        
    })

    qase(7, it('Verify user is able to navigate to Dashboard page successfully', { tags:'smoke' }, () => {
        cy.wait(2000)
        commonActions.clickElementContainingTextAtIndex(commonLocators.button, locatorTextData.dashboard)
    }))

    qase(8, it('Verify Consumption filter is set as default',{ tags:'regression' }, () => {
        cy.wait(2000)
        commonActions.clickElementContainingTextAtIndex(commonLocators.button, locatorTextData.dashboard)
        cy.wait(2000)
        commonActions.clickElementAtIndex(dashboardLocators.buildingsDropdownBtn, 1)
        commonActions.clickElementContainingTextAtIndex(commonLocators.option, locatorTextData.kita_building)
        commonActions.checkTextIsExisting(textData.dashboardPage.consumption)
    }))

    qase(9, it('Should verify user is able to set Meter Reading metric',{ tags:'regression' }, () => {
        cy.wait(2000)
        commonActions.clickElementContainingTextAtIndex(commonLocators.button, locatorTextData.dashboard)
        cy.wait(2000)
        commonActions.clickElementAtIndex(dashboardLocators.buildingsDropdownBtn, 1)
        commonActions.clickElementContainingTextAtIndex(commonLocators.option, locatorTextData.kita_building)
        commonActions.clickElementContainingTextAtIndex(commonLocators.button, textData.dashboardPage.metrics)
        commonActions.clickElementContainingTextAtIndex(commonLocators.option, textData.dashboardPage.consumption)
        commonActions.clickElementContainingTextAtIndex(commonLocators.option, locatorTextData.meterReading)
        commonActions.clickElementAtIndex(commonLocators.windowElement)
        commonActions.checkTextIsExisting(textData.dashboardPage.meterReadings)
    }))

    qase(10, it('Should verify user is able to set Temperature metric',{ tags:'regression' }, () => {
        cy.wait(2000)
        commonActions.clickElementContainingTextAtIndex(commonLocators.button, locatorTextData.dashboard)
        cy.wait(2000)
        commonActions.clickElementAtIndex(dashboardLocators.buildingsDropdownBtn, 1)
        commonActions.clickElementContainingTextAtIndex(commonLocators.option, locatorTextData.kita_building)
        commonActions.clickElementContainingTextAtIndex(commonLocators.button, textData.dashboardPage.metrics)
        commonActions.clickElementContainingTextAtIndex(commonLocators.option, textData.dashboardPage.consumption)
        commonActions.clickElementContainingTextAtIndex(commonLocators.option, locatorTextData.temperature)
        commonActions.clickElementAtIndex(commonLocators.windowElement)
        commonActions.checkTextIsExisting(textData.dashboardPage.temperature)
    }))

    qase(11, it('Should verify user is able to set Connectivity metric',{ tags:'regression' }, () => {
        cy.wait(2000)
        commonActions.clickElementContainingTextAtIndex(commonLocators.button, locatorTextData.dashboard)
        cy.wait(2000)
        commonActions.clickElementAtIndex(dashboardLocators.buildingsDropdownBtn, 1)
        commonActions.clickElementContainingTextAtIndex(commonLocators.option, locatorTextData.kita_building)
        commonActions.clickElementContainingTextAtIndex(commonLocators.button, textData.dashboardPage.metrics)
        commonActions.clickElementContainingTextAtIndex(commonLocators.option, textData.dashboardPage.consumption)
        commonActions.clickElementContainingTextAtIndex(commonLocators.option, locatorTextData.connectivity)
        commonActions.clickElementAtIndex(commonLocators.windowElement)
        commonActions.checkTextIsExisting(textData.dashboardPage.connectivity)
    }))

    qase(38, it('Should verify all buildings are shown under the customer',{ tags:'regression' }, () => {
        cy.wait(2000)
        commonActions.clickElementContainingTextAtIndex(commonLocators.button, locatorTextData.dashboard)
        cy.wait(2000)
        commonActions.clickElementAtIndex(dashboardLocators.buildingsDropdownBtn, 1)
        commonActions.checkTextIsExisting(textData.dashboardPage.buildings.aaaa)
        commonActions.checkTextIsExisting(textData.dashboardPage.buildings.kita_building)
        commonActions.checkTextIsExisting(textData.dashboardPage.buildings.test2)
        commonActions.checkTextIsExisting(textData.dashboardPage.buildings.test2bug)
        commonActions.checkTextIsExisting(textData.dashboardPage.buildings.zipzap)
    } ))

    //Ask Gaurav about this
    qase(39, it.skip('Should verify device selector shows all buildings under the customer', { tags:'regression' }, () => {

    }))

    qase(40, it('Should verify the 3 cards (Water consumption, Temperature, Alerts) have data values & Last updated dates',{ tags:'regression' }, () => {
        cy.wait(2000)
        commonActions.clickElementContainingTextAtIndex(commonLocators.button, locatorTextData.dashboard)
        cy.wait(2000)
        commonActions.clickElementAtIndex(dashboardLocators.buildingsDropdownBtn, 1)
        commonActions.clickElementContainingTextAtIndex(commonLocators.option, textData.dashboardPage.buildings.kita_building)
        commonActions.checkTextIsExisting(textData.dashboardPage.sensorsData.meterReadingData)
        commonActions.checkTextIsExisting(textData.dashboardPage.sensorsData.temperatureData)
        commonActions.checkTextIsExisting(textData.dashboardPage.sensorsData.numberOfAlertsLast24H)
    }))

    qase(41, it('Should verify time period selector / calendar widget is visible and working', { tags:'regression' }, () => {
        cy.wait(2000)
        commonActions.clickElementContainingTextAtIndex(commonLocators.button, locatorTextData.dashboard)
        cy.wait(2000)
        commonActions.clickElementAtIndex(dashboardLocators.buildingsDropdownBtn, 1)
        commonActions.clickElementContainingTextAtIndex(commonLocators.option, textData.dashboardPage.buildings.kita_building)
        commonActions.clickElementContainingTextAtIndex(commonLocators.typeButton, locatorTextData.last24Hours)
        commonActions.clickElementContainingTextAtIndex(commonLocators.typeButton, locatorTextData.week)
        commonActions.clickElementContainingTextAtIndex(commonLocators.typeButton, locatorTextData.month)
    }))
})