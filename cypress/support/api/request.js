class Request {
  get (url) {
    return cy.request({
      method: 'GET',
      url
    })
  }
}

export default new Request()
