import { CommonActions } from "../../support/utils/commonActions"
import { locatorTextData } from "../../fixtures/constants"
import { CommonLocators } from "../../support/utils/commonLocators"
import { textData } from "../../fixtures/constants"

const commonActions = new CommonActions
const commonLocators = new CommonLocators

export class adminBuildingsPage {
    populateAddNewBuildingForm() {
        commonActions.populateInputAtIndex(buildingsPageLocators.buildingNameField, generateRandomStringOfXChars(15), 0)
        commonActions.populateInputAtIndex(buildingsPageLocators.buildingNameField, generateRandomStringOfXChars(15), 1)
        commonActions.populateInputAtIndex(buildingsPageLocators.buildingNameField, generateRandomStringOfXChars(15), 2)
        commonActions.populateInputAtIndex(buildingsPageLocators.buildingNameField, generateRandomStringOfXChars(15), 3)
        commonActions.populateInputAtIndex(buildingsPageLocators.buildingNameField, generateRandomStringOfXChars(15), 4)
        commonActions.clickElementAtIndex(buildingsPageLocators.buildingNameField, 5)
    }


}