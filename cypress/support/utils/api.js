export const apiUrl = "/v1/graphql";

export function getAccessToken() {
    cy.request(
        {
            url: '',
            method: 'POST',
            body: {
                "username": "",
                "password": ""
            }
        }
    ).then(response => {
        let loginToken = response.body.token
        return loginToken
    }).as('loginToken')
}