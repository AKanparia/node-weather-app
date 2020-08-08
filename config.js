const dotenv = require('dotenv')
dotenv.config()

module.exports = {
  port: process.env.PORT,
  locationKey: process.env.LOCATION_API_KEY,
  weatherKey: process.env.WEATHER_API_KEY,
}
