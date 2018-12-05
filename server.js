const app = require('express')()
const bodyParser = require('body-parser')
const logger = require('morgan')

const port = process.env.PORT || 3030

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('*', (req, res) => {
  res.send('Welcome to the Nigerian Anti-Terrorism Unit, how can we help you ?')
})

app.post('*', (req, res) => {
  let { sessionId, serviceCode, phoneNumber, text } = req.body
  let name = "";
  let address = "";
  let details = "";
  let textValue = text.split('*').length;

  let Emergency = {
    phoneNumber: "",
    name: "",
    location: "",
    details: ""
  }


  if (text === '') {
    message = "Welcome to the Nigerian Anti-Terrorism Unit, how can we help you, Please enter your name."
  } else if (textValue === 1) {
    message = "CON Please enter the location"
    Emergency.name = text;
  } else if (textValue === 2) {
    message = "CON Please describe the situation on ground ?"
    Emergency.location = text.split('*')[1];
  } else if (textValue === 3) {
    message = "CON What's your telephone number?"
    Emergency.details = text.split('*')[2];
   }
    else {
    message = `END Thanks Our team will take up and get back soon`
  }
  res.send(message);
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})