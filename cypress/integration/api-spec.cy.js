import { graphql } from 'graphql';
import gql from 'graphql-tag';
import graphqlAnywhere from 'graphql-anywhere';
import { qase } from 'cypress-qase-reporter/dist/mocha';

describe('Hasura Integration Test', () => {
  qase(19, it('should fetch data from Hasura', () => {
    const query = gql`
      query GetBuildingById($id: uuid!) {
        buildings_by_pk(id: $id) {
          id
          street
          house_number
          zip_code
          city
          country
          name
          device_sets {
            id
            devices {
              name
              room_type
              serial_number
              id
              type
              events {
                device_id
                id
                message
                severity
                timestamp
                metric
                __typename
              }
              __typename
            }
            __typename
          }
          __typename
        }
      }
      `;

    cy.request({
      method: 'POST',
      url: 'https://leak360-testing-hasura.leak360.io/v1/graphql',
      body: {
        "operationName": "GetBuildingById",
        "variables": {
          "id": "e0032ee4-ea10-475b-91a9-6acaa12fa835"
        },
        query: query.loc.source.body,
      },
    }).then((response) => {
      console.log(response)
      // Assert on the response
      expect(response.status).to.eq(200);
      expect(response.body.data.buildings_by_pk).to.have.length.above(0);
    });
  }));
});