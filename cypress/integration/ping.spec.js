/// <reference types="cypress" />

import req from '../support/api/request'
import assertion from '../support/api/assertion'

describe('Ping', () => {
  it('should GET /ping - @healthcheck', () => {
    req.get('ping').then(({ status }) => {
      assertion.status(status, 201)
    })
  })
})
