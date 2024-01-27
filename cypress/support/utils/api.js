import { generateRandomStringOfXChars } from "./randomUtils"

export function getAccessToken() {
    cy.request(
        {
            url: '/users',
            method: 'POST',
            body: {
                "firstName": "nermin",
                "lastName": "sahman",
                "email":  generateRandomStringOfXChars(10) + "@mail.com",
                "password": ""
            }
        }
    ).then(response => {
        let loginToken = response.body.token
        return loginToken
    }).as('loginToken')
}