const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')
const { port } = require('../config')

const app = express()

//Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebar engine and views
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//constants
const name = 'Abhishek Kanparia'

//Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name,
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name,
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name,
    helpMsg: 'help text here',
  })
})

app.get('/weather', (req, res) => {
  const address = req.query.address
  if (!req.query.address) {
    return res.send({
      error: 'You must provide location/address.',
    })
  }

  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error })
    }

    forecast(latitude, longitude, (error, forcastData) => {
      if (error) {
        return res.send({ error })
      }

      res.send({
        forecast: forcastData,
        location,
        address,
      })
    })
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    name,
    title: '404',
    errorMsg: 'Help article not found',
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    name,
    title: '404',
    errorMsg: 'Page not found',
  })
})

app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})
