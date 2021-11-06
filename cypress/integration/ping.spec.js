/// <reference types="cypress" />

describe('Ping', () => {
  it('should GET /ping - @healthcheck', () => {
    cy.request({
      method: 'GET',
      url: 'ping'
    }).then((response) => {
      expect(response.status).to.eq(201)
    })
  })
})
