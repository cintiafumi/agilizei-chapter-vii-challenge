/// <reference types="cypress" />

import req from '../support/api/request'
import assertion from '../support/api/assertion'
import schema from '../support/api/schema'

const booking = {
  firstname: 'Maria',
  lastname: 'Silva',
  totalprice: 111,
  depositpaid: true,
  bookingdates: {
    checkin: '2022-01-01',
    checkout: '2022-01-02'
  },
  additionalneeds: 'Breakfast'
}

describe('Booking', () => {
  before(() => {
    req.auth()
  })

  it('should list all booking @contract', () => {
    req.get('booking').then(({ body }) => {
      assertion.contract(body, schema.bookings())
    })
  })

  it('should create a new booking @functional', () => {
    req.post('booking', booking).then(({ status, body }) => {
      assertion.status(status, 200)
      assertion.notNull(body.bookingid)
    })
  })

  it('should create and list one booking @contract', () => {
    req.post('booking', booking).then(({ body }) => {
      assertion.contract(body, schema.newBooking())

      const { bookingid } = body
      req.get(`booking/${bookingid}`).then(({ body }) => {
        assertion.contract(body, schema.booking())
      })
    })
  })

  it('should update a booking @functional', () => {
    const updatedBooking = booking
    updatedBooking.depositpaid = false

    req.post('booking', booking).then(({ body }) => {
      const { bookingid } = body
      req.put(`booking/${bookingid}`, updatedBooking).then(({ status }) => {
        assertion.status(status, 200)
      })
    })
  })

  it('should not update a booking @functional', () => {
    const bookingid = 'test'

    req.put(`booking/${bookingid}`, booking).then(({ status }) => {
      assertion.status(status, 405)
    })
  })

  it('should delete a booking @functional', () => {
    req.post('booking', booking).then(({ body }) => {
      const { bookingid } = body
      req.delete(`booking/${bookingid}`).then(({ status }) => {
        assertion.status(status, 201)
      })
    })
  })

  it('should not delete an inexistent booking @functional', () => {
    const bookingid = 'test'
    req.delete(`booking/${bookingid}`).then(({ status }) => {
      assertion.status(status, 405)
    })
  })

  it('should not delete a booking without token @functional', () => {
    req.post('booking', booking).then(({ body }) => {
      const { bookingid } = body
      req.delete(`booking/${bookingid}`, null).then(({ status }) => {
        assertion.status(status, 403)
      })
    })
  })

  it('should not delete a booking with an invalid token @functional', () => {
    const headers = {
      Cookie: 'token=invalid'
    }

    req.post('booking', booking).then(({ body }) => {
      const { bookingid } = body
      req.delete(`booking/${bookingid}`, headers).then(({ status }) => {
        assertion.status(status, 403)
      })
    })
  })
})
