const app = require('express')()
const bodyParser = require('body-parser')
const logger = require('morgan')

const port = process.env.PORT || 3030

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('*', (req, res) => {
  res.send('Welcome to the Ambulance Operation divisions, how can we help you ?')
})

app.post('*', (req, res) => {
  let {sessionId, serviceCode, phoneNumber, text} = req.body
  if (text == '') {
    // This is the first request. Note how we start the response with CON
    let response = `CON Welcome ${phoneNumber} How can we help you today ?
    1. I am in an emergency
    2. I want to report an emergency `
    res.send(response)
  } else if (text == '1') {
    // Business logic for first level response
    let response = `CON Choose account information you want to view
    1. Account number
    2. Account balance`
    res.send(response)
  } else if (text == '2') {
    // Business logic for first level response
    let response = `END Your phone number is ${phoneNumber}`
    res.send(response)
  } else if (text == '1*1') {
    // Business logic for first level response
    let accountNumber = 'ACC1001'
    // This is a terminal request. Note how we start the response with END
    let response = `END Your account number is ${accountNumber}`
    res.send(response)
  } else if (text == '1*2') {
    // This is a second level response where the user selected 1 in the first instance
    let balance = 'NGN 10,000'
    // This is a terminal request. Note how we start the response with END
    let response = `END Your balance is ${balance}`
    res.send(response)
  } else {
    res.status(400).send('Bad request!')
  }
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})