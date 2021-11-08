class Assertion {
  status (received, expected) {
    expect(received).to.eq(expected)
  }
}

export default new Assertion()
