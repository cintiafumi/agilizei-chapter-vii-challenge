import spok from 'cy-spok'

class Schema {
  bookings () {
    return spok.array
  }

  booking () {
    return spok({
      firstname: spok.string,
      lastname: spok.string,
      totalprice: spok.number,
      depositpaid: spok.type('boolean'),
      bookingdates: {
        checkin: spok.string,
        checkout: spok.string
      },
      additionalneeds: spok.string
    })
  }

  newBooking () {
    return spok({
      bookingid: spok.number,
      booking: {
        firstname: spok.string,
        lastname: spok.string,
        totalprice: spok.number,
        depositpaid: spok.type('boolean'),
        bookingdates: {
          checkin: spok.string,
          checkout: spok.string
        },
        additionalneeds: spok.string
      }
    })
  }
}

export default new Schema()
