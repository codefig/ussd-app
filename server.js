const app = require('express')()
const bodyParser = require('body-parser')
const logger = require('morgan')

const port = process.env.PORT || 3030

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('*', (req, res) => {
  res.send('Welcome to the Emergency Operation Unit, how can we help you ?')
})

app.post('*', (req, res) => {
  let {sessionId, serviceCode, phoneNumber, text} = req.body
  let name = "";
  let address = "";
  let details = "";
  let textValue = text.split('*').length;

  let message = "";
  if(text == ''){
    message = `Welcome ${phoneNumber} to EOU, how can we help you today ${textValue} ?`
  }
  else if(text == 1){
     message = "Please kindly tell us your name . "
     name = text;
  }

  else if(text == 2){
    message = "Please Kindly tell us the address of the emergency "
    address = text;
  }

  else if(text == 3){
    message = "please describe briefly the situation on ground."
    details = text;
  }

  res.send(message);
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})