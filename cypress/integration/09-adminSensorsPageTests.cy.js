import { CommonActions } from "../support/utils/commonActions"
import { locatorTextData } from "../fixtures/constants"
import { CommonLocators } from "../support/utils/commonLocators"
import { textData } from "../fixtures/constants"
import { adminCustomersPage } from "../pages/adminCustomersPage/adminCustomersPage"
import { generateRandomStringOfXChars } from "../support/utils/randomUtils"
import { adminCustomersPageLocators } from "../pages/adminCustomersPage/adminCustomersPageLocators"
import { adminSensorsPageLocators } from "../pages/adminSensorsPage/adminSensorsPageLocators"
import { qase } from 'cypress-qase-reporter/dist/mocha';

const commonActions = new CommonActions
const commonLocators = new CommonLocators
const customersPageLocators = new adminCustomersPageLocators
const customersPage = new adminCustomersPage
const sensorsPageLocators = new adminSensorsPageLocators

describe('Admin Sensors Page tests', () => {
    beforeEach('Login on app', () => {
        cy.login(Cypress.env('email'), Cypress.env('password'))
    })

    qase(21, it('Verify Admin user is able to add new sensor and create new set', { tags: 'smoke' }, () => {
        let serialNumber = 'sn_' + generateRandomStringOfXChars(5)
        Cypress.env('serialNumber', serialNumber);
        commonActions.clickElementContainingTextAtIndex(commonLocators.button, locatorTextData.sensors, 1)
        commonActions.clickElementContainingTextAtIndex(commonLocators.button, locatorTextData.devices)
        let sensorSetId;
        cy.addNewDeviceAndSensorSet(Cypress.env('gateway'), serialNumber, sensorSetId, 1)

    }))
    qase(22, it('Verify Device and Status filters are visible on Devices page', { tags: 'regression' }, () => {
        commonActions.clickElementContainingTextAtIndex(commonLocators.button, locatorTextData.sensors, 1)
        commonActions.clickElementContainingTextAtIndex(commonLocators.button, locatorTextData.devices)
        commonActions.checkElementIsVisible(sensorsPageLocators.deviceFilter)
        commonActions.checkElementIsVisible(sensorsPageLocators.statusFilter)
    }))
    qase(23, it('Verify Device and Status filters dropdown options on Devices page', { tags: 'regression' }, () => {
        commonActions.clickElementContainingTextAtIndex(commonLocators.button, locatorTextData.sensors, 1)
        commonActions.clickElementContainingTextAtIndex(commonLocators.button, locatorTextData.devices)
        commonActions.clickElementAtIndex(sensorsPageLocators.deviceFilter)
        commonActions.checkElementContainingTextIsDisplayed(sensorsPageLocators.filterOptions, textData.adminDevicesPage.floorSensor)
        commonActions.checkElementContainingTextIsDisplayed(sensorsPageLocators.filterOptions, textData.adminDevicesPage.gateway)
        commonActions.checkElementContainingTextIsDisplayed(sensorsPageLocators.filterOptions, textData.adminDevicesPage.waterMeterSensor)
        commonActions.clickElementAtIndex(commonLocators.windowElement)
        commonActions.clickElementAtIndex(sensorsPageLocators.statusFilter)
        commonActions.checkElementContainingTextIsDisplayed(sensorsPageLocators.filterOptions, textData.adminDevicesPage.assigned)
        commonActions.checkElementContainingTextIsDisplayed(sensorsPageLocators.filterOptions, textData.adminDevicesPage.unassigned)
        
    }))
    qase(24, it('Verify Device keys are displayed after clicking on device on Devices page', { tags: 'regression' }, () => {
        commonActions.clickElementContainingTextAtIndex(commonLocators.button, locatorTextData.sensors, 1)
        commonActions.clickElementContainingTextAtIndex(commonLocators.button, locatorTextData.devices)
        let serialNumber = 'sn_' + generateRandomStringOfXChars(5)
        let sensorSetId;
        cy.addNewDeviceAndSensorSet(Cypress.env('floorSensor'), serialNumber, sensorSetId, 0)
        commonActions.populateInputAtIndex(commonLocators.searchInput, serialNumber)
        cy.wait(3000)
        commonActions.clickElementContainingTextAtIndex(sensorsPageLocators.deviceNameCell, serialNumber)
        commonActions.checkElementIsVisible(sensorsPageLocators.appKeyField)
        commonActions.checkElementIsVisible(sensorsPageLocators.appEUIField)
        commonActions.checkElementIsVisible(sensorsPageLocators.devEUIField)
    }))

    qase(25, it('Verify applied filters are visible on Devices page with updated grid', { tags: 'regression' }, () => {
        commonActions.clickElementContainingTextAtIndex(commonLocators.button, locatorTextData.sensors, 1)
        commonActions.clickElementContainingTextAtIndex(commonLocators.button, locatorTextData.devices)
        let serialNumber = 'sn_' + generateRandomStringOfXChars(5)
        let sensorSetId;
        let serialNumber2 = generateRandomStringOfXChars(10)
        let sensorSetId2;
        cy.addNewDeviceAndSensorSet(Cypress.env('floorSensor'), serialNumber, sensorSetId, 0)
        cy.addNewDeviceAndSensorSet(Cypress.env('gateway'), serialNumber2, sensorSetId2, 1)

        commonActions.clickElementContainingTextAtIndex(commonLocators.button, locatorTextData.devices)
        commonActions.clickElementAtIndex(sensorsPageLocators.deviceFilter)
        commonActions.clickElementContainingTextAtIndex(commonLocators.option, textData.adminDevicesPage.floorSensor)
        commonActions.clickElementAtIndex(commonLocators.windowElement)
        commonActions.clickElementAtIndex(sensorsPageLocators.deviceFilter)
        commonActions.clickElementContainingTextAtIndex(commonLocators.option, textData.adminDevicesPage.floorSensor)
        commonActions.clickElementAtIndex(commonLocators.windowElement)
        //treba mi pomoc, hocu da udjem u svaki row i u column Device Type i potvrdim da je vrijednost jednaka filteru
        /* cy.get(sensorsPageLocators.deviceRow).each((row) => {
             cy.wrap(row).within(() => {
                 cy.get('div span[aria-label="Floor sensor type"]').should('contain', textData.adminDevicesPage.floorSensor);
             })
         })
         */
    }))

    qase(26, it('Verify multiple devices can be selected in devices grid', { tags: 'regression' }, () => {
        commonActions.clickElementContainingTextAtIndex(commonLocators.button, locatorTextData.sensors, 1)
        commonActions.clickElementContainingTextAtIndex(commonLocators.button, locatorTextData.devices)
        let serialNumber = 'sn_' + generateRandomStringOfXChars(5)
        let sensorSetId;
        let serialNumber2 = generateRandomStringOfXChars(10)
        let sensorSetId2;
        cy.addNewDeviceAndSensorSet(Cypress.env('floorSensor'), serialNumber, sensorSetId, 0)
        cy.addNewDeviceAndSensorSet(Cypress.env('gateway'), serialNumber2, sensorSetId2, 1)

        commonActions.clickElementContainingTextAtIndex(commonLocators.button, locatorTextData.devices)
        cy.wait(3000)
        commonActions.clickElementAtIndex(commonLocators.checkbox, 1)
        commonActions.clickElementAtIndex(commonLocators.checkbox, 2)
        cy.get(commonLocators.checkbox).eq(1)
            .should('be.checked');
        cy.get(commonLocators.checkbox).eq(2)
            .should('be.checked');

    }))

    qase(27, it('Verify Admin user is able to unassign device from sensor set', { tags: 'smoke' }, () => {
        commonActions.clickElementContainingTextAtIndex(commonLocators.button, locatorTextData.sensors, 1)
        commonActions.clickElementContainingTextAtIndex(commonLocators.button, locatorTextData.devices)
        let serialNumber = 'sn_' + generateRandomStringOfXChars(5)
        let sensorSetId;
        cy.addNewDeviceAndSensorSet(Cypress.env('gateway'), serialNumber, sensorSetId, 1)
        cy.wait(5000)
        commonActions.clickElementAtIndex(commonLocators.checkbox)
        commonActions.clickElementContainingTextAtIndex(commonLocators.typeButton, textData.adminDevicesPage.actions)
        cy.get('li[role="menuitem"]').contains(textData.adminDevicesPage.unassignFromSet).click()
        commonActions.checkElementTextAtIndex(sensorsPageLocators.notiSnackbarText, "Devices successfully unassigned from sensor set")
    }))

    qase(28, it('Verify Admin user is able to assign device to sensor set', { tags: 'smoke' }, () => {
        commonActions.clickElementContainingTextAtIndex(commonLocators.button, locatorTextData.sensors, 1)
        commonActions.clickElementContainingTextAtIndex(commonLocators.button, locatorTextData.devices)
        const serialNumbers = ['serialNumber1', 'serialNumber2']
        serialNumbers.forEach((serialNumber, index) => {
            serialNumbers[index] = `${serialNumber}-${generateRandomStringOfXChars(5)}`;
          })
        let sensorSetId;
        let sensorSetId2;
        Cypress.env('serialNumbers', serialNumbers);
        cy.addNewDeviceAndSensorSet(Cypress.env('gateway'), serialNumbers[0], sensorSetId, 1)
        commonActions.clickElementContainingTextAtIndex(commonLocators.button, locatorTextData.devices)
        cy.addNewDeviceAndSensorSet(Cypress.env('gateway'), serialNumbers[1], sensorSetId2, 0)
        commonActions.populateInputAtIndex(commonLocators.searchInput, serialNumber2)
        cy.wait(2000)
        commonActions.clickElementAtIndex(commonLocators.checkbox)
        commonActions.clickElementContainingTextAtIndex(commonLocators.typeButton, textData.adminDevicesPage.actions)
        cy.get('li[role="menuitem"]').contains(textData.adminDevicesPage.assignToSet).click()
      
        commonActions.populateInputAtIndex(commonLocators.searchInput, cy.get('@sensorSetId'))
        commonActions.clickElementAtIndex(sensorsPageLocators.setsRadioBtn)
        commonActions.clickElementContainingTextAtIndex(commonLocators.typeButton, textData.adminDevicesPage.assignToSet)
        commonActions.checkElementTextAtIndex(sensorsPageLocators.notiSnackbarText, "Devices successfully assigned to sensor set ${cy.get('@sensorSetId')}")
    }))

    qase(29, it('Verify device type numbers are dynamically updated on Devices page', { tags: 'smoke' }, () => {
        commonActions.clickElementContainingTextAtIndex(commonLocators.button, locatorTextData.sensors, 1)
        commonActions.clickElementContainingTextAtIndex(commonLocators.button, locatorTextData.devices)
        let serialNumber = generateRandomStringOfXChars(10)
        let sensorSetId;
        let serialNumber2 = generateRandomStringOfXChars(10)
        let sensorSetId2;
        let serialNumber3 = generateRandomStringOfXChars(10)
        let sensorSetId3;
        let serialNumber4 = generateRandomStringOfXChars(10)
        let sensorSetId4;
        cy.addNewDeviceAndSensorSet(Cypress.env('gateway'), serialNumber, sensorSetId, 1)
        commonActions.clickElementContainingTextAtIndex(commonLocators.button, locatorTextData.devices)
        cy.addNewDeviceAndSensorSet(Cypress.env('waterMeterSensor'), serialNumber2, sensorSetId2, 0)
        commonActions.clickElementContainingTextAtIndex(commonLocators.button, locatorTextData.devices)
        cy.addNewDeviceAndSensorSet(Cypress.env('floorSensor'), serialNumber3, sensorSetId3, 0)
        commonActions.clickElementContainingTextAtIndex(commonLocators.button, locatorTextData.devices)
        cy.addNewDeviceAndSensorSet(Cypress.env('gateway'), serialNumber4, sensorSetId4, 0)
        cy.wait(2000)
        commonActions.clickElementContainingTextAtIndex(commonLocators.button, locatorTextData.devices)
        commonActions.clickElementAtIndex(sensorsPageLocators.deviceFilter)
        commonActions.clickElementContainingTextAtIndex(commonLocators.option, textData.adminDevicesPage.floorSensor)
        commonActions.clickElementAtIndex(commonLocators.windowElement)
        commonActions.clickElementAtIndex(commonLocators.checkbox, 1)
        commonActions.clickElementAtIndex(commonLocators.checkbox, 2)
        cy.get('span.target-span').then((span) => {
            const numericalValue = span.text(); // Get the initial string
            const secondString = span.find('span.second-string').text();
        })
    }))

    afterEach(() => {
        const buildingName = Cypress.env('buildingName');
        const customerName = Cypress.env('customerName');
        const serialNumber = Cypress.env('serialNumber');
        const serialNumbers = Cypress.env('serialNumbers');

        if (serialNumbers && serialNumbers.length > 0) {
          serialNumbers.forEach((serialNumber) => {
            commonActions.clickElementContainingTextAtIndex(commonLocators.button, locatorTextData.sensors, 1)
            commonActions.clickElementContainingTextAtIndex(commonLocators.button, locatorTextData.devices)
            cy.deleteDevice(serialNumber) 
          })
        }

        if (buildingName) {
            commonActions.clickElementContainingTextAtIndex(commonLocators.button, locatorTextData.buildings)
            cy.deleteBuilding(buildingName)
        }
        if (customerName) {
            commonActions.clickElementContainingTextAtIndex(commonLocators.button, locatorTextData.customers)
            cy.deleteCustomer(customerName)
        }
        if (serialNumber){
            cy.wait(3000)
            //commonActions.clickElementContainingTextAtIndex(commonLocators.button, locatorTextData.sensors, 1)
            //commonActions.clickElementContainingTextAtIndex(commonLocators.button, locatorTextData.devices)
            cy.deleteDevice(serialNumber)
        }
    })
})