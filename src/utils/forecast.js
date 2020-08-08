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
      const { weather_descriptions, temperature, feelslike, humidity } = body.current
      callback(
        undefined,
        `${weather_descriptions[0]}. The current temperature is at ${temperature}°C, but feels like ${body.current.feelslike}°C. Humidity is ${humidity}%.`
      )
    }
  })
}

module.exports = forecast
