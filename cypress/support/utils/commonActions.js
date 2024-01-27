export class CommonActions {


    generateString(length) {
        const characters =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    
        let result = "";
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
    
        return result;
      }

      clearInputAtIndex(locator, index = 0) {
        cy.get(locator).eq(index).clear();
      }

      clearInputContainingTextAtIndex(locator, text, index = 0) {
        cy.get(`${locator}:visible:contains(${text})`)
          .eq(index)
          .scrollIntoView()
          .clear();
      }

      clickElementContainingTextAtIndex(locator, text, index = 0) {
        cy.get(`${locator}:visible:contains(${text})`)
          .eq(index)
          .scrollIntoView()
          .click({force: true});
      }

      clickElementAtIndex(locator, index = 0) {
        cy.get(locator).eq(index).scrollIntoView().click();
      }

      populateInputAtIndex(locator, text, index = 0) {
        this.clearInputAtIndex(locator, index);
        cy.get(locator).eq(index).type(text);
      }

      populateInputAtIndexContainingText(locator, text, textValue, index = 0) {
        this.clearInputAtIndex(locator, index);
        cy.get(locator).contains(textValue).eq(index).type(text, {force: true});
      }

      checkElementContainingTextIsDisplayed(locator, text) {
        cy.contains(locator, text).scrollIntoView().should("be.visible");
      }

      checkElementContainingTextExists(locator, text) {
        cy.contains(locator, text).scrollIntoView().should("exist");
      }

      checkElementDoesNotExist(locator) {
        cy.get(locator).should("not.exist");
      }

      checkElementContaingTextDoesNotExist(text) {
        cy.contains(text).should("not.exist");
      }

      checkElementIsVisible(locator) {
        cy.get(locator).should("be.visible");
      }

      checkNumberOfElements(locator, numberOfElements) {
        cy.get(locator)
          .should("be.visible")
          .should("have.length", numberOfElements);
      }

      checkNumberOfElementsContainingText(locator, text, numberOfElements) {
        cy.get(locator)
          .contains(locator, text)
          .should("be.visible")
          .should("have.length", numberOfElements);
      }

      checkElementTextAtIndex(locator, text, index = 0) {
        cy.get(`${locator}:visible`)
          .eq(index)
          .invoke("text")
          .then((textFound) => {
            expect(textFound).to.eq(text);
          });
      }

      clickElementAtIndexWithinElementContainingText(
        parentElem,
        text,
        childElem,
        index = 0
      ) {
        cy.get(parentElem)
          .contains(parentElem, text)
          .siblings()
          .within(() => {
            this.clickElementAtIndex(childElem, index);
          });
      }

      checkTextIsExisting(text) {
        cy.contains(text).should('be.visible')
      }

      checkDisabledElement(locator) {
        cy.get(locator).should("be.disabled");
      }

      checkEnabledElement(locator) {
        cy.get(locator).should("be.enabled");
      }

      checkDisabledTextElement(tag, text) {
        cy.contains(tag, text).should("be.disabled");
      }

      checkEnabledTextElement(tag, text) {
        cy.contains(tag, text).should("be.disabled");
      }

      checkElementHavingAttribute(locator, attr) {
        cy.contains(locator).should("have.attr", attr);
      }

      checkPageHavingURL(url) {
        cy.url().should("eq", url);
      }

      checkClosedElement(locator) {
        cy.get(locator).should("not.be.visible");
      }

      getTableElementColumn(colValue) {
        return cy.get(`tr td:nth-child(${colValue})`)
      }

      getTableElementCell(colValue) {
        return cy.get(`tr td p:nth-child(${colValue})`)
      }

      checkBoxWithValue(locator, value) {
        cy.get(locator).check(value)
      }
}