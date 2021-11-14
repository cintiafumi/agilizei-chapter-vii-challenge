const cookie = () => ({
  headers: {
    Cookie: `token=${Cypress.env('token')}`
  }
})

class Request {
  auth () {
    this.post('auth', {
      username: 'admin',
      password: 'password123'
    }).then(({ body }) => {
      const { token } = body
      Cypress.env('token', token)
    })
  }

  get (url, headers = cookie()) {
    return cy.request({
      method: 'GET',
      ...(headers),
      url,
      failOnStatusCode: false
    })
  }

  post (url, body, headers = cookie()) {
    return cy.request({
      method: 'POST',
      ...(headers),
      url,
      body,
      failOnStatusCode: false
    })
  }

  put (url, body, headers = cookie()) {
    return cy.request({
      method: 'PUT',
      ...(headers),
      url,
      body,
      failOnStatusCode: false
    })
  }

  delete (url, headers = cookie()) {
    return cy.request({
      method: 'DELETE',
      ...(headers),
      url,
      failOnStatusCode: false
    })
  }
}

export default new Request()
