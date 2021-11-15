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

  forbidden (msg) {
    expect(msg).to.equal('Forbidden')
  }

  notAllowed (msg) {
    expect(msg).to.equal('Method Not Allowed')
  }
}

export default new Assertion()
