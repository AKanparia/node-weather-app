const request = require('request')
const { weatherKey } = require('../../config')

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=${weatherKey}&query=${latitude},${longitude}`

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather service', undefined)
    } else if (body.error) {
      callback('Unable to find location, Try another search', undefined)
    } else {
      callback(
        undefined,
        `It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees out.`
      )
    }
  })
}

module.exports = forecast
