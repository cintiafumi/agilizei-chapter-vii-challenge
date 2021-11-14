class Assertion {
  status (received, expected) {
    expect(received).to.eq(expected)
  }

  contract (received, schema) {
    cy.wrap(received).should(schema)
  }

  notNull (received) {
    expect(received, `${received} exists`).to.not.be.null
  }
}

export default new Assertion()
