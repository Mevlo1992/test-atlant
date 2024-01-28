import { generateRandomStringOfXChars } from "../support/utils/randomUtils";

describe('API Users Flow', () => {
    let bearerToken;
    let userEmail;

    it('1. Add User', () => {
      cy.request({
        method: 'POST',
        url: '/users',
        body: {
          "firstName": "nermin",
          "lastName": "sahman",
          "email": generateRandomStringOfXChars(10) + "@mail.com",
          "password": Cypress.env('password')
        },
      }).then((response) => {
        expect(response.status).to.equal(201);

        // Save variables for later use
        bearerToken = response.body.token;
        userEmail = response.body.user.email;
      });
    });

    it('2. Get User Profile', () => {
      // Ensure bearerToken is available
      if (!bearerToken) {
        throw new Error('Bearer token not available. Did you run the "Add User" test?');
      }

      cy.request({
        method: 'GET',
        url: 'users/me',
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      }).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('_id');
        expect(response.body).to.have.property('firstName');
        expect(response.body).to.have.property('lastName');
        expect(response.body).to.have.property('email');
        expect(response.body).to.have.property('__v');
        expect(response.body.email).to.equal(userEmail);

      });
    });

    it('3. Update User', () => {
      // Ensure bearerToken is available
      if (!bearerToken) {
        throw new Error('Bearer token not available. Did you run the "Add User" test?');
      }

      cy.request({
        method: 'PATCH',
        url: '/users/me',
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
        body: {
          "firstName": "nermin",
          "lastName": "sahman",
          "email": generateRandomStringOfXChars(10) + "@mail.com",
          "password": Cypress.env('password')
        },
      }).then((response) => {
        expect(response.status).to.equal(200);

        // Update variables after the user is updated
        userEmail = response.body.email;
      });
    });

    it('4. Get User Profile', () => {
      // Ensure bearerToken is available
      if (!bearerToken) {
        throw new Error('Bearer token not available. Did you run the "Add User" test?');
      }

      cy.request({
        method: 'GET',
        url: 'users/me',
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      }).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('_id');
        expect(response.body).to.have.property('firstName');
        expect(response.body).to.have.property('lastName');
        expect(response.body).to.have.property('email');
        expect(response.body).to.have.property('__v');
        expect(response.body.email).to.equal(userEmail);

      });
    });

    it('5. POST - Log out endpoint', () => {
      // Ensure bearerToken is available
      if (!bearerToken) {
        throw new Error('Bearer token not available. Did you run the "Add User" test?');
      }

      cy.request({
        method: 'POST',
        url: '/users/logout',
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      }).then((response) => {
        expect(response.status).to.equal(200);
      });
    });

    it('6. POST - Log in endpoint with updated email and password', () => {
      cy.request({
        method: 'POST',
        url: '/users/login',
        body: {
          "email": userEmail,
          "password": Cypress.env('password')
        },
      }).then((response) => {
        expect(response.status).to.equal(200);
        bearerToken = response.body.token;
      });
    });

    it('7. DELETE - Delete User', () => {
      // Ensure bearerToken is available
      if (!bearerToken) {
        throw new Error('Bearer token not available. Did you run the "Add User" test?');
      }

      cy.request({
        method: 'DELETE',
        url: '/users/me',
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      }).then((response) => {
        expect(response.status).to.equal(200);
      });
    });

    it('8. Log in - to check that user cannot log in after deletion', () => {
      cy.request({
        method: 'POST',
        url: 'users/login',
        body: {
          "email": userEmail,
          "password": Cypress.env('password')
        },
        failOnStatusCode: false, // Allow the request to fail
      }).then((response) => {
        expect(response.status).to.equal(401); // Expect Unauthorized status
      });
    });
  });

  describe ('API Contacts Flow', () => {
    /// <reference types="cypress" />

  let bearerToken;
  let contactId;
  let firstName = "John"

    it('1. Add User', () => {
      cy.request({
        method: 'POST',
        url: '/users',
        body: {
          "firstName": "nermin",
          "lastName": "sahman",
          "email": generateRandomStringOfXChars(10) + "@mail.com",
          "password": Cypress.env('password')
        },
      }).then((response) => {
        expect(response.status).to.equal(201);

        // Save variables for later use
        bearerToken = response.body.token;
      });
    });

  it('2. Add Contact, Retrieve ID, and Store as Variable', () => {
    cy.request({
      method: 'POST',
      url: '/contacts',
      body: {
          "firstName": firstName,
          "lastName": "Doe",
          "birthdate": "1970-01-01",
          "email": "jdoe@fake.com",
          "phone": "8005555555",
          "street1": "1 Main St.",
          "street2": "Apartment A",
          "city": "Anytown",
          "stateProvince": "KS",
          "postalCode": "12345",
          "country": "USA"
      },
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(201);
      contactId = response.body._id; // Assuming the contact ID is in the response body
    });
  });

  it('3. Get Contact List', () => {
    cy.request({
      method: 'GET',
      url: '/contacts',
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      // Add assertions for the contact list if needed
    });
  });

  it('4. Get Contact By ID', () => {
    cy.request({
      method: 'GET',
      url: `/contacts/${contactId}`,
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      // Add assertions for the contact details if needed
      firstName = "John-Updated";
    });
  });

  it('5. PATCH – Update Contact', () => {
    cy.request({
      method: 'PATCH',
      url: `/contacts/${contactId}`,
      body: {
        "firstName": firstName
      },
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it('6. Get Contact By ID and Assert Patched firstName', () => {
    cy.request({
      method: 'GET',
      url: `/contacts/${contactId}`,
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.firstName).to.eq(firstName); // Replace with the expected patched value
      firstName = "John-Updated-2";
    });
  });

  it('7. PUT – Update Contact and Retrieve Updated ID', () => {
    cy.request({
      method: 'PUT',
      url: `/contacts/${contactId}`,
      body: {
        "firstName": firstName,
        "lastName": "Doe",
        "birthdate": "1970-01-01",
        "email": "jdoe@fake.com",
        "phone": "8005555555",
        "street1": "1 Main St.",
        "street2": "Apartment A",
        "city": "Anytown",
        "stateProvince": "KS",
        "postalCode": "12345",
        "country": "USA"
      },
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      contactId = response.body._id; // Assuming the contact ID is updated in the response body
    });
  });

  it('8. Get Contact By Updated ID', () => {
    cy.request({
      method: 'GET',
      url: `/contacts/${contactId}`,
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.firstName).to.eq(firstName); // Replace with the expected updated value
      // Add assertions for the contact details if needed
    });
  });

  it('9. Delete Contact', () => {
    cy.request({
      method: 'DELETE',
      url: `/contacts/${contactId}`,
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
});
